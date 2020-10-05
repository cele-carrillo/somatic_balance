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
