#!/bin/bash

set -eu

JEKYLL_ENV=production bundle exec jekyll build \
&& CI=true bundle exec rake test

git add _data/
git add res

git commit -m "latest audio exploration"
git push origin HEAD
make travis
