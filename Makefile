.PHONY: build

AWS_PROFILE = reflect.io
CONTENT_BUCKET = reflect-styleguide

setup:
	npm install
	npm rebuild node-sass
	@if [ "$(shell which gulp)" == "" ]; then npm install -g gulp; fi

release_npm:
	npm publish