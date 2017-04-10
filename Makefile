.PHONY: build

AWS_PROFILE = reflect.io
CONTENT_BUCKET = reflect-styleguide

setup:
	npm install
	npm rebuild node-sass
	@if [ "$(shell which gulp)" == "" ]; then npm install -g gulp; fi

release_npm:
	npm publish

build_styleguide:
	npm run styleguide:build

release_styleguide: build_styleguide
	aws s3 sync styleguide/ s3://$(CONTENT_BUCKET) --delete --acl public-read --profile $(AWS_PROFILE) --region us-east-1
