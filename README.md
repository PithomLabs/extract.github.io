# Pithom Labs Scraper — Getting Started

Pithom Labs Scraper is a tool that extracts data from websites and saves it in a structured format (like a spreadsheet). It runs entirely on your computer — no account or sign-up required. You just need an internet connection and Google Chrome.

This guide will walk you through every step to get it running, even if you have never used a command line before.

---

## Table of Contents

1. [What You Need](#what-you-need)
2. [Download the Right File](#download-the-right-file)
3. [Setup — Windows](#setup--windows)
4. [Setup — macOS (Apple)](#setup--macos-apple)
5. [Setup — Linux (Debian / Ubuntu)](#setup--linux-debian--ubuntu)
6. [Common Issues](#common-issues)
7. [Get Help](#get-help)

---

## What You Need

Before you start, make sure you have the following:

- **Google Chrome** — the scraper uses Chrome to visit websites. If you don't have it, download it for free at [google.com/chrome](https://www.google.com/chrome/).
- **An internet connection** — the scraper needs to visit websites to extract data from them.

That's it. No other software is required.

---

## Download the Right File

Go to the releases page to download the scraper:

**https://github.com/PithomLabs/extract.github.io/releases**

Download the file that matches your computer:

| Your Computer | Download This File |
|---|---|
| **Windows** (most PCs and laptops) | `scraper-windows-amd64.exe` |
| **Mac with Apple Silicon** (M1, M2, M3, M4, or newer) | `scraper-darwin-arm64` |
| **Mac with Intel chip** (older Macs, before 2021) | `scraper-darwin-amd64` |
| **Linux** (Debian or Ubuntu, 64-bit) | `scraper-linux-amd64` |

Also download this **README.md** file if you haven't already — you're reading it!

### How do I know which Mac I have?

1. Click the **Apple menu** (🍎) in the top-left corner of your screen.
2. Click **About This Mac**.
3. Look for the **Chip** or **Processor** line:
   - If it says **Apple M1**, **M2**, **M3**, or **M4** → download `scraper-darwin-arm64`
   - If it says **Intel** → download `scraper-darwin-amd64`

---

## Setup — Windows

Follow these steps one at a time. Each step explains exactly what to do and where to click.

### Step 1: Find the downloaded file

Open **File Explorer** (the yellow folder icon on your taskbar at the bottom of the screen). Navigate to your **Downloads** folder. You should see a file named `scraper-windows-amd64.exe`.

### Step 2: Create a folder for the scraper

You can put the scraper anywhere you like. Here is one easy option:

1. Open **File Explorer**.
2. Click on **This PC** in the left sidebar.
3. Double-click on your **C: drive** (usually called "Local Disk (C:)").
4. Right-click in an empty area → click **New** → click **Folder**.
5. Name the folder `Scraper` and press **Enter**.

You now have a folder at `C:\Scraper`.

### Step 3: Move and rename the file

1. Go back to your **Downloads** folder.
2. Right-click on `scraper-windows-amd64.exe` → click **Cut** (or press Ctrl+X).
3. Navigate to the `C:\Scraper` folder you just created.
4. Right-click in the empty area → click **Paste** (or press Ctrl+V).
5. Right-click on the file → click **Rename**.
6. Change the name to `scraper.exe` and press **Enter**.

### Step 4: Open Command Prompt

The **Command Prompt** is a text-based window where you type instructions for your computer. Here's how to open it:

1. Press the **Windows key** on your keyboard (the key with the Windows logo, usually between Ctrl and Alt).
2. Type `cmd` — you will see **Command Prompt** appear in the search results.
3. Click on **Command Prompt** to open it.

A black window will appear with some text and a blinking cursor. This is where you will type commands.

### Step 5: Navigate to the scraper folder

In the Command Prompt window, type the following and press **Enter**:

```
cd C:\Scraper
```

This tells your computer to "go to" the Scraper folder. You should see the prompt change to show `C:\Scraper>`.

### Step 6: Launch the scraper

Type the following and press **Enter**:

```
scraper.exe ui
```

**What happens next:** Google Chrome will open automatically with the Pithom Labs Scraper dashboard. You can now start using the scraper from that browser window.

> **Tip:** Keep the Command Prompt window open while you are using the scraper. Closing it will shut down the scraper.

---

## Setup — macOS (Apple)

Follow these steps one at a time.

### Step 1: Find the downloaded file

Open **Finder** (the blue-and-white smiley face icon in your Dock at the bottom of the screen). Click on **Downloads** in the left sidebar. You should see a file named either `scraper-darwin-arm64` or `scraper-darwin-amd64` (depending on which one you downloaded).

### Step 2: Create a folder for the scraper

1. In **Finder**, click on **Desktop** in the left sidebar (or any location you prefer).
2. Right-click (or Control-click) in an empty area → click **New Folder**.
3. Name it `Scraper` and press **Return**.

### Step 3: Move and rename the file

1. Go back to your **Downloads** in Finder.
2. Drag the downloaded file into the `Scraper` folder you just created on your Desktop.
3. Right-click on the file → click **Rename**.
4. Change the name to `scraper` (remove everything after "scraper") and press **Return**.

### Step 4: Open Terminal

The **Terminal** is a text-based window where you type instructions for your Mac. Here's how to open it:

1. Press **Cmd + Space** (hold down the Command key and press Space). This opens **Spotlight Search**.
2. Type `Terminal` and press **Return**.

A white (or black) window will appear with some text and a blinking cursor. This is where you will type commands.

### Step 5: Navigate to the scraper folder

In the Terminal window, type the following and press **Return**:

```
cd ~/Desktop/Scraper
```

This tells your Mac to "go to" the Scraper folder on your Desktop. If you put the folder somewhere else, adjust the path accordingly.

### Step 6: Make the file executable

Your Mac needs permission to run the scraper. Type the following and press **Return**:

```
chmod +x scraper
```

This gives your computer permission to run the scraper file. You only need to do this once.

### Step 7: Launch the scraper

Type the following and press **Return**:

```
./scraper ui
```

The `./` at the beginning tells your Mac to run the file in the current folder.

**What happens next:** Google Chrome will open automatically with the Pithom Labs Scraper dashboard. You can now start using the scraper from that browser window.

> **Tip:** Keep the Terminal window open while you are using the scraper. Closing it will shut down the scraper.

---

## Setup — Linux (Debian / Ubuntu)

These instructions are for Debian-based distributions (Debian, Ubuntu, Linux Mint, Pop!_OS, etc.).

### Step 1: Find the downloaded file

Open your file manager and navigate to your **Downloads** folder. You should see a file named `scraper-linux-amd64`.

### Step 2: Create a folder and move the file

Open a terminal (you can usually find it by searching "Terminal" in your application launcher, or press **Ctrl + Alt + T**).

Create a folder, move the file into it, and rename it:

```
mkdir -p ~/Scraper
mv ~/Downloads/scraper-linux-amd64 ~/Scraper/scraper
```

### Step 3: Make the file executable

```
chmod +x ~/Scraper/scraper
```

### Step 4: Navigate to the folder and launch

```
cd ~/Scraper
./scraper ui
```

**What happens next:** Google Chrome will open automatically with the Pithom Labs Scraper dashboard.

> **Tip:** Keep the terminal window open while you are using the scraper. Closing it will shut down the scraper.

---

## Common Issues

### Windows: "Windows protected your PC"

**What you see:** A blue window appears saying "Windows protected your PC" or "Microsoft Defender SmartScreen prevented an unrecognized app from starting."

**Why this happens:** Windows shows this warning for any software it hasn't seen before. It does not mean the file is dangerous.

**How to fix it:**

1. Click **More info** (this text link appears below the warning message).
2. A **Run anyway** button will appear at the bottom.
3. Click **Run anyway**.

You only need to do this the first time you run the scraper.

---

### macOS: "cannot be opened because it is from an unidentified developer"

**What you see:** A popup saying the file "can't be opened because Apple cannot check it for malicious software" or "it is from an unidentified developer."

**Why this happens:** macOS blocks software that isn't downloaded from the App Store or from a known developer. This is a standard security feature.

**How to fix it (Method 1 — easiest):**

1. Open **Finder** and navigate to your Scraper folder.
2. **Right-click** (or Control-click) on the `scraper` file.
3. Click **Open** from the menu.
4. A dialog will appear — click **Open** again.

macOS will remember your choice, and you won't see this warning again for this file.

**How to fix it (Method 2 — if Method 1 doesn't work):**

1. Click the **Apple menu** (🍎) → **System Settings** (or **System Preferences** on older macOS).
2. Click **Privacy & Security**.
3. Scroll down. You should see a message about the scraper being blocked.
4. Click **Allow Anyway** (or **Open Anyway**).
5. Go back to Terminal and try `./scraper ui` again.

---

### macOS: "Permission denied"

**What you see:** The Terminal shows `permission denied` when you try to run `./scraper ui`.

**Why this happens:** You haven't given your Mac permission to run the file yet.

**How to fix it:** Run the following command in Terminal, then try launching again:

```
chmod +x scraper
```

---

### Nothing happens / Chrome doesn't open

**What you see:** You typed the command, but Chrome didn't open and nothing visible happened.

**Check the following:**

1. **Is Google Chrome installed?** The scraper needs Chrome to work. Download it from [google.com/chrome](https://www.google.com/chrome/) if you haven't already.

2. **Did you see an error message?** Look at the Command Prompt (Windows) or Terminal (Mac/Linux) window. If there is an error message, take note of it — you can share it with support.

3. **Try running the command again.** Sometimes the first attempt may fail if Chrome was still starting up. Close everything and try the launch command once more.

---

### Windows: "is not recognized as an internal or external command"

**What you see:** Command Prompt shows `'scraper.exe' is not recognized as an internal or external command, operable program or batch file.`

**Why this happens:** You are not in the correct folder, or the file was not renamed correctly.

**How to fix it:**

1. Make sure you navigated to the right folder. Type `cd C:\Scraper` (or wherever you put the file) and press Enter.
2. Type `dir` and press Enter to list the files in the folder. Verify that `scraper.exe` appears in the list.
3. If the file has a different name (like `scraper-windows-amd64.exe`), rename it to `scraper.exe` and try again.

---

### Linux: Chrome opens but the page won't load

**What you see:** Chrome opens but shows a blank page or a connection error.

**How to fix it:** Wait a few seconds and refresh the page. The scraper server may still be starting up. If the problem persists, check the terminal for error messages.

---

### The scraper stopped working / the dashboard is gone

**What happened:** You closed the Command Prompt (Windows) or Terminal (Mac/Linux) window.

**How to fix it:** The scraper runs inside that window. When you close it, the scraper stops. Re-open Command Prompt or Terminal, navigate to your folder, and run the launch command again:

- **Windows:** `scraper.exe ui`
- **macOS / Linux:** `./scraper ui`

---

## Get Help

If you are stuck on any step or encounter an issue not listed above, we are happy to help.

Visit our support page:

**https://ekstract.tech/support**

When reaching out, it helps if you can share:

- Which step you are on
- What operating system you are using (Windows, Mac, or Linux)
- Any error message you see in the Command Prompt or Terminal window (you can copy text from there and paste it into your message)


# Pithom Labs

All Rights Reserved.

## Copyright

© Pithom Labs

