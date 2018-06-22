.PHONY: build

setup:
	npm install
	@if [ "$(shell which gulp)" == "" ]; then npm install -g gulp; fi

release_npm:
	npm publish
