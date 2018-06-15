.PHONY: build

AWS_PROFILE = reflect.io
CONTENT_BUCKET = reflect-styleguide

setup:
	npm install

release_npm:
	npm publish