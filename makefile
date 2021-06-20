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
	open https://travis-ci.com/github/cele-carrillo/somatic_balance/builds/

.PHONY: compress-audio
compress-audio:
	python _scripts/audio-compress.py

.PHONY: purge-cache
purge-cache:
	./_scripts/purge-cache.sh

.PHONY: add-exploration
add-exploration:
	./_scripts/add-exploration.sh

.PHONY: publish-exploration
publish-exploration:
	./_scripts/publish-exploration.sh
