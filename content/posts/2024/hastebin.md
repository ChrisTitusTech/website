---
title: "Hastebin"

date: 2024-05-08
url: /hastebin/
image: images/2024-thumbs/hastebin.jpg
categories:
  - Linux
  - Windows
tags:
  - Hastebin
draft: false
---
<!--more-->
Hastebin is a simple and efficient tool for sharing code snippets and text online. It's particularly useful for developers and content creators who need to quickly share pieces of code or logs without the hassle of setting up a more complex environment. Here's a quick guide on how to use Hastebin:

## Getting Started with Hastebin
1. **Access Hastebin**: Open your web browser and go to [http://bin.christitus.com](http://bin.christitus.com).
2. **Create a New Paste**: Simply start typing in the large text area on the Hastebin homepage. Once you begin typing, Hastebin automatically creates a new paste.

## Saving and Sharing
- **Save Your Paste**: To save your paste, press `Ctrl+S` or click on the 'Save' icon in the top right corner. Hastebin will then generate a unique URL for your paste.
- **Share Your Paste**: Share the URL with anyone you want to have access to your text. They can view it directly in their browser without needing to log in or create an account.

## Additional Features
- **Duplicate**: You can create a new paste based on the current one by clicking the 'Duplicate' button. This is useful for making modifications without altering the original paste.
- **Raw View**: For a plain text version of your paste, click on the 'Raw' button. This is particularly useful for embedding the text in other applications.

## PowerShell Function

Quickly upload a file via this function

```
function hb {
    if ($args.Length -eq 0) {
        Write-Error "No file path specified."
        return
    }

    $FilePath = $args[0]

    if (Test-Path $FilePath) {
        $Content = Get-Content $FilePath -Raw
    } else {
        Write-Error "File path does not exist."
        return
    }

    $uri = "http://bin.christitus.com/documents"
    try {
        $response = Invoke-RestMethod -Uri $uri -Method Post -Body $Content -ErrorAction Stop
        $hasteKey = $response.key
        $url = "http://bin.christitus.com/$hasteKey"
        Write-Output $url
    } catch {
        Write-Error "Failed to upload the document. Error: $_"
    }
}
```

## Bash Function

```
function hb {
    if [ $# -eq 0 ]; then
        echo "No file path specified."
        return
    elif [ ! -f "$1" ]; then
        echo "File path does not exist."
        return
    fi

    uri="http://bin.christitus.com/documents"
    response=$(curl -s -X POST -d "$(cat "$1")" "$uri")
    if [ $? -eq 0 ]; then
        hasteKey=$(echo $response | jq -r '.key')
        echo "http://bin.christitus.com/$hasteKey"
    else
        echo "Failed to upload the document."
    fi
}
```

## Syntax Highlighting
Hastebin supports syntax highlighting for multiple programming languages, which makes it easier to read code snippets. The site automatically detects the language based on the syntax, but you can also manually specify the language by using the appropriate file extension in the URL (e.g., `http://bin.christitus.com/example.py`).

### Conclusion
Hastebin is a handy tool for anyone looking to share text or code snippets quickly and efficiently. Its ease of use and no-nonsense approach make it a favorite among many in the tech community.

## Walkthrough Video

{{< youtube "TpI1siclED0" >}}
