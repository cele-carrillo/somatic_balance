#!/bin/bash

set -eu

JEKYLL_ENV=production make
git add _data/
git add res

git commit -m "latest audio exploration"
git push origin HEAD
make travis
