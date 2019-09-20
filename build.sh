#!/bin/bash

##### BUILD

echo
echo "BUILD STARTED"
echo

cd bdc-aouth-app
docker build -t image-to-build-bdc-aouth-app . --no-cache

docker run --name bdc-aouth-app-node-build -v $PWD/../deploy/dist:/deploy/dist image-to-build-bdc-aouth-app
docker rm bdc-aouth-app-node-build
docker rmi image-to-build-bdc-aouth-app

cd ../deploy
echo
echo "NEW TAG:"
read IMAGE_TAG
IMAGE_BASE="registry.dpi.inpe.br/dpi/oauth-app"
IMAGE_FULL="${IMAGE_BASE}:${IMAGE_TAG}"

docker build -t ${IMAGE_FULL} .
sudo rm -r dist
docker push ${IMAGE_FULL}
