#!/bin/bash
#
# This script makes sure that, if the build is part of a pull request, the
# build will fail if the pull request is open against master.
#
PACKAGE_VERSION="0.1.0"
PACKAGE="github-pull-request-base-${PACKAGE_VERSION}-amd64.deb"
DPKG=`which dpkg`

# Start by making sure that this is configured to actually work.
if [[ "x$CI_PULL_REQUEST" == "x" ]];
then
  echo "NOTE: This build is not building a pull request. Skipping."
  exit 0
fi

if [[ "x$GITHUB_ACCESS_TOKEN" == "x" ]];
then
  echo "NOTE: Access to Github is not configured. Skipping."
  exit 0
fi

if [[ $DPKG == "" ]];
then
  echo "NOTE: Not a Debian system. Skipping"
  exit 0
fi

REPO="$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME"

# CI_PULL_REQUEST has the URL of the pull request. We just want the number
# (which is the last bit).
PULL_REQUEST=`basename $CI_PULL_REQUEST`

# Okay, we can do all the things we need so let's download the deb package and
# install our binary.
if [[ ! -x /usr/bin/github-pull-request-base ]];
then
  curl https://s3.amazonaws.com/bradhe-packages/${PACKAGE} > /tmp/${PACKAGE}
  sudo dpkg -i /tmp/${PACKAGE}
fi

BASE=`/usr/bin/github-pull-request-base \
  -pull-request=${PULL_REQUEST} \
  -access-token=${GITHUB_ACCESS_TOKEN} \
  -repo=${REPO}`

if [[ "$BASE" == "master" ]];
then
  echo "ERROR: Pull request ${PULL_REQUEST} is open against master. Aborting build."
  exit 1
else
  echo "NOTE: Pull request ${PULL_REQUEST} is open against ${BASE}."
  exit 0
fi
