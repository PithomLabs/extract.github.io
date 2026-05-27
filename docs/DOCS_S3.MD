# Migrating Images to Tigris Data (S3) & Updating Slideshows

This guide details the plan to move static images from the GitHub repository to an S3-compatible service (Tigris Data) and update the Hugo site to serve them efficiently.

## Goal
Offload image storage to a CDN-enabled object storage (Tigris) to improve site performance and reduce repository size. Update the slideshow component to consume these remote images.

## Prerequisites
1.  **Tigris Data Account**: You need a bucket created in Tigris (e.g., `izaakmaine-assets`).
2.  **AWS CLI**: Installed and configured with Tigris credentials.
3.  **Python (Optional)**: For a helper script to generate image manifests.

---

## Step 1: Configure Tigris Data (S3)

1.  **Create a Bucket**:
    Create a new bucket in your Tigris dashboard. Let's assume the name is `izaakmaine-assets`.
2.  **Get Credentials**:
    Obtain your `Access Key`, `Secret Key`, and `Endpoint URL`.
3.  **Configure AWS CLI**:
    ```bash
    aws configure
    # AWS Access Key ID: <Your_Tigris_Access_Key>
    # AWS Secret Access Key: <Your_Tigris_Secret_Key>
    # Default region name: <Your_Region, e.g., fly>
    # Default output format: json
    ```

## Step 2: Upload Images

Use the AWS CLI to sync your local `static/images` folder to the bucket. We will mirror the directory structure.

```bash
# General syntax
aws s3 sync static/images s3://izaakmaine-assets/images --endpoint-url https://fly.storage.tigris.dev --acl public-read

# Example for specific 'magellan' folder
aws s3 sync static/images/magellan s3://izaakmaine-assets/images/magellan --endpoint-url https://fly.storage.tigris.dev --acl public-read
```

*> **Note**: The `--acl public-read` flag ensures files are accessible via standard HTTP URLs.*

---

## Step 3: Handle File Listing (The "Manifest" Problem)

Hugo's `readDir` function works **only** on local files. It cannot list files in an S3 bucket during the build process. To solve this, we generate a **Data File** (JSON) that lists the images for each slideshow.

### A. Create a Manifest Generator Script
Create a script (e.g., `scripts/generate_manifest.py`) to scan your local folders (or the S3 bucket) and create a JSON file for Hugo.

**Example Logic:**
1.  Scan `static/images/magellan`.
2.  Find all images (`.jpg`, `.png`, etc.).
3.  Sort them.
4.  Write to `data/slideshows/magellan.json`.

**Content of `data/slideshows/magellan.json`:**
```json
[
  "01-departure.jpg",
  "02-at-sea.jpg",
  "03-storm.jpg"
]
```

### B. Run the Script
Before building the site, run this script to ensure the data files are up-to-date.

---

## Step 4: Update Hugo Configuration

Add your CDN URL to `hugo.yaml` so we can easily toggle or change it later.

**File:** `hugo.yaml`
```yaml
params:
  # ... existing params
  cdn:
    enabled: true
    url: "https://fly.storage.tigris.dev/izaakmaine-assets/images"
```

---

## Step 5: Update the Slideshow Shortcode

Modify `layouts/shortcodes/slideshow.html` to look for the data file first. If it exists, use the remote URL. If not, fall back to local files.

**Modified Logic Plan:**

1.  **Get Parameters**: Retrieve `path` (e.g., "magellan").
2.  **Check Data**: Look for `site.Data.slideshows.<path>`.
3.  **If Data Exists (S3 Mode)**:
    - Iterate through the list in the JSON file.
    - Construct `src` using `params.cdn.url` + `path` + filename.
4.  **If Data Missing (Local Mode)**:
    - Use `readDir "static/images/<path>"`.
    - Construct `src` using absolute local path.

### Code Snippet Concept:

```go
{{ $path := .Get "path" }}
{{ $cdnEnabled := site.Params.cdn.enabled | default false }}
{{ $cdnUrl := site.Params.cdn.url }}
{{ $images := slice }}

{{/* Try to find a data file match: data/slideshows/<path>.json */}}
{{ $manifest := index site.Data.slideshows $path }}

{{ if and $cdnEnabled $manifest }}
  {{/* S3 MODE */}}
  {{ range $manifest }}
    {{ $imageUrl := printf "%s/%s/%s" $cdnUrl $path . }}
    {{ $images = $images | append (dict "Name" . "URL" $imageUrl) }}
  {{ end }}
{{ else }}
  {{/* LOCAL MODE */}}
  {{ $localPath := printf "static/%s" $path }}
  {{ if (fileExists $localPath) }}
    {{ $files := readDir $localPath }}
    {{ range $files }}
       {{ if (findRE "(?i)\\.(jpg|png|jpeg|webp)$" .Name) }}
         {{ $imageUrl := printf "/%s/%s" $path .Name }}
         {{ $images = $images | append (dict "Name" .Name "URL" $imageUrl) }}
       {{ end }}
    {{ end }}
  {{ end }}
{{ end }}

{{/* Render Loop using .URL */}}
<div class="slideshow-container" ...>
  {{ range $index, $img := $images }}
    <img src="{{ $img.URL }}" alt="{{ $img.Name }}">
  {{ end }}
</div>
```

---

## Step 6: Workflow Summary

1.  **Add Images**: Place new images in `static/images/new-gallery`.
2.  **Sync**: Run `aws s3 sync ...` to upload to Tigris.
3.  **Generate**: Run the manifest script to update `data/slideshows/`.
4.  **Deploy**: Push changes. Hugo builds the site using the JSON manifests and S3 URLs.

## Benefits
- **Performance**: Images served from CDN/Object Storage.
- **Repository Size**: You can eventually remove `static/images` from the Git repo (add to `.gitignore`) once you are comfortable with the S3 workflow, keeping only the manifest generation from a separate source or just manually maintaining the JSON data.
