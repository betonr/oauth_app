#!/bin/bash

##### BUILD

echo
echo "BUILD STARTED"
echo

cd bdc-oauth-app
docker build -t image-to-build-bdc-oauth-app . --no-cache

docker run --name bdc-oauth-app-node-build -v $PWD/../deploy/dist:/deploy/dist image-to-build-bdc-oauth-app
docker rm bdc-oauth-app-node-build
docker rmi image-to-build-bdc-oauth-app

cd ../deploy
echo
echo "NEW TAG:"
read IMAGE_TAG
IMAGE_BASE="registry.dpi.inpe.br/dpi/oauth-app"
IMAGE_FULL="${IMAGE_BASE}:${IMAGE_TAG}"

docker build -t ${IMAGE_FULL} .
sudo rm -r dist
docker push ${IMAGE_FULL}
