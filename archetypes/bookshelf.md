---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
author: ""
year:             # publication year
pages:
status: reading   # reading | read | want
started: {{ .Date | time.Format "2006-01-02" }}
finished:         # YYYY-MM-DD, when status is read
progress: 0       # percent, while reading
rating:           # 1 to 5, when status is read
cover: cover.jpg  # optional: put cover.jpg next to this file
tags: []
---

## TL;DR

## Chapter notes

### Chapter 1
