#!/bin/bash

set -eu

git fetch
git checkout gh-pages
git pull
make compress-audio

echo "Título de la meditacion (por ej: Aprendiendo a respirar): "
read title

echo "Descripción de la meditacion (una oración, por ejemplo: Exploramos encontrarnos en tal o cual cosa.): "
read description

cat << EOF >> _data/resources.yml

  - title: "${title}"
    description: "${description}"
    path: "/$(git ls-files -o --exclude-standard res/audio)"
    author: Celeste
    lang: es
    selectors:
      - exploraciones-somaticas-web
EOF

open http://localhost:4000/exploraciones-somaticas/ &
make watch
