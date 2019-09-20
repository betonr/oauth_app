# Oauth App - Deploy

## Installation
### Requirements

Make sure you have the following libraries installed:

- [`Node.js >= 8.x`](https://nodejs.org/en/)
- [`Angular CLI >= 7`](https://angular.io/)

```
cd ../bdc-oauth-app && npm install
```

## Runnig

* firstly, configure the files in the `src/environments` folder.

```
cd ../bdc-oauth-app && npm run build
cd ../deploy
docker build -t registry.dpi.inpe.br/dpi/oauth-app:0.0.1
```