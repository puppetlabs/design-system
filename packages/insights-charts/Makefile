.PHONY: build

setup:
	npm install
	npm rebuild node-sass
	@if [ "$(shell which gulp)" == "" ]; then npm install -g gulp; fi

release_npm:
	npm publish
