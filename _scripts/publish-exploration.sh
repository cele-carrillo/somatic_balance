#!/bin/bash

set -eu

make
git add _data/
git add res

git commit -m "latest audio exploration"
git push origin HEAD
make travis
