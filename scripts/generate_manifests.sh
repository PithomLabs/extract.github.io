#!/usr/bin/env bash
# Generate Hugo data files from static/images subdirectories

MANIFEST_DIR="data/slideshows"
IMAGE_DIR="static/images"

mkdir -p "$MANIFEST_DIR"

for dir in "$IMAGE_DIR"/*/; do
    gallery_name=$(basename "$dir")
    manifest_file="$MANIFEST_DIR/${gallery_name}.json"
    
    echo "Generating manifest for: $gallery_name"
    
    # Find image files, sort, and format as JSON array
    files=$(find "$dir" -maxdepth 1 -type f \
        \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) \
        -printf '%f\n' | sort)
    
    # Build JSON array
    echo "[" > "$manifest_file"
    first=true
    while IFS= read -r file; do
        [ -z "$file" ] && continue
        if [ "$first" = true ]; then
            echo "  \"$file\"" >> "$manifest_file"
            first=false
        else
            echo "  ,\"$file\"" >> "$manifest_file"
        fi
    done <<< "$files"
    echo "]" >> "$manifest_file"
    
    echo "  -> $manifest_file ($(echo "$files" | grep -c .) images)"
done

echo "Done! Manifests written to $MANIFEST_DIR/"