---
title: "git commit --fixup keeps history clean"
date: 2026-11-05
draft: true
tags: [git]
---

`git commit --fixup <sha>` creates a commit that is marked to be squashed into `<sha>`. Later, `git rebase -i --autosquash <base>` moves it into place automatically.

It's a nice way to fix a commit from code review without rewriting history by hand.
