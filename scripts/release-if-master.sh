#!/bin/bash
#
# This script inspects the current SHA that's being built and sees if there is
# a tag associated with it. If there is, releases it to the staging aread for
# deployment.
#
COMMIT=$(git rev-parse HEAD)
TAG=$(git tag --points-at ${COMMIT})
SORT=/usr/bin/sort
TARGET_BRANCH="master"
BUILDING_BRANCH=$DISTELLI_RELBRANCH

# If we see gsort out there we'll use that instead of the default sort tool.
if [[ -e `which gsort` ]];
then
  SORT=`which gsort`
fi

# Abandon ship if we're on the wrong branch.
if [[ $BUILDING_BRANCH != $TARGET_BRANCH ]];
then
  echo "Building ${BUILDING_BRANCH} but we tag off of ${TARGET_BRANCH}. Skipping."
  exit 0
fi

# Abandon ship if there is currently a tag.
if [[ "x$TAG" != "x" ]];
then
  echo "Already tagged."
  exit 0
fi

# This is the current minor version on master.
PACKAGE_VERSION=`cat package.json  | grep version | awk '{print $2}' | egrep -o '([0-9]+\.[0-9]+\.[0-9]+)'`
MINOR_VERSION=`echo ${PACKAGE_VERSION} | sed -e 's/\./ /g' | awk '{print "v" $1 "." $2}'`

git fetch --tags origin

# Let's find the current (max) tag and we'll increment from there.
LAST_VERSION=`git tag | grep '^v[0-9]' | ${SORT} -V | grep ${MINOR_VERSION} | tail -n 1`
CURRENT_VERSION=""

# If there is no last version then we start from the beginning of the lineage.
if [[ ${LAST_VERSION} == "" ]];
then
  CURRENT_VERSION="${MINOR_VERSION}.0"
else
  # Need to bump the patch version, so we'll keep at it.
  PATCH_VERSION=`echo $LAST_VERSION | sed -e 's/\./ /g' | awk '{print $3}'`
  NEW_PATCH_VERSION=$(($PATCH_VERSION+1))

  CURRENT_VERSION="${MINOR_VERSION}.${NEW_PATCH_VERSION}"
fi

echo "Releasing version ${CURRENT_VERSION}"

# Update package.json, which is used in the rest of the system.
NEW_PACKAGE_VERSION=`echo ${CURRENT_VERSION} | egrep -o '([0-9]+\.[0-9]+\.[0-9]+)'`
sed -i -e "s/\"version\": \"${PACKAGE_VERSION}\"/\"version\": \"${NEW_PACKAGE_VERSION}\"/g" ./package.json

# Okay, let's do the release now!
git tag ${CURRENT_VERSION}
git push --tags

# If this is the latest version, we need to mark it as latest.
LATEST_VERSION=`git tag | grep '^v[0-9]' | ${SORT} -V | tail -n 1`

if [[ $LATEST_VERSION == $CURRENT_VERSION ]];
then
  make release_npm || exit 1
fi
