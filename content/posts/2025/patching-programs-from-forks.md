---
title: "Patching Programs From Forks"

date: 2025-09-01
url: /patching-programs-from-forks/
image: images/2025-thumbs/patching-programs-from-forks.webp
categories:
  - Linux
  - Windows
tags:
  - Git
draft: false
---
This article explains how to patch programs from forks using Git. It covers the steps to clone a forked repository, create a patch file, and apply it to the original repository.
<!--more-->

## Creating Patch Files

Go to the repo that is ahead of the project that you want patched.

```
git format-patch -1 <COMMITSHA>
```

Git commit sha located at:
 
![git-sha](/images/2025/git-sha.webp)

## Patching the Original Repo

Check the stats and if there will be any rejects from patching

Stats:
```
git apply --stat <PATCHFILE>
```

Check for rejects:
```
git apply --check <PATCHFILE>
```

Apply a clean patch:
```
git am <PATCHFILE>
```

Apply a patch with rejects:
```
git am --reject <PATCHFILE>
```

Note: You may need to resolve conflicts manually if there are rejects. Look in the directory for any `*.rej` and manually fix the lines that did NOT get applied!
