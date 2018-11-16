#!/bin/bash
#
# This script inspects the current SHA that's being built and sees if there is
# a tag associated with it. If there is, releases it to the staging aread for
# deployment.
#
COMMIT=$(git rev-parse HEAD)
TAG=$(git tag --points-at ${COMMIT})
TARGET_BRANCH="5.0-release"
BUILDING_BRANCH=$DISTELLI_RELBRANCH

# Abandon ship if we're on the wrong branch.
if [[ $BUILDING_BRANCH != $TARGET_BRANCH ]];
then
  echo "Building ${BUILDING_BRANCH} but we tag alpha off of ${TARGET_BRANCH}. Skipping."
  exit 0
fi

# Abandon ship if there is currently a tag.
if [[ "x$TAG" != "x" ]];
then
  echo "Already tagged."
  exit 0
fi

# Get current version from package.json
PACKAGE_VERSION=`cat package.json  | grep version | awk '{print $2}' | egrep -o '([0-9]+\.[0-9]+\.[0-9]+)'`

echo "Releasing version ${PACKAGE_VERSION}"

# Publish to npm. This will error if current version is already published. I think that's ok
npm publish --tag next

# Now tag github
git tag ${PACKAGE_VERSION}
git push --tags
