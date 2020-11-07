.PHONY: all
all: build test

.PHONY: build
build:
	bundle exec jekyll build

.PHONY: test
test:
	bundle exec rake test

.PHONY: watch
watch:
	bundle exec jekyll serve

.PHONY: travis
travis:
	open https://travis-ci.org/github/cele-carrillo/somatic_balance/builds/

.PHONY: compress-audio
compress-audio:
	python _scripts/audio-compress.py

.PHONY: purge-cache
purge-cache:
	./_scripts/purge-cache.sh
