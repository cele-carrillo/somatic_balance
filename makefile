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
	open http://localhost:4000 && bundle exec jekyll serve
