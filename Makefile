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

release_styleguide:
	aws s3 cp styleguide/ s3://$(CONTENT_BUCKET) --recursive --acl public-read --profile $(AWS_PROFILE) --region us-east-1
