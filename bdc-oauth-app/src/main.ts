/*!
 * This file is part of WEB App for OAuth 2.0.
    Copyright (C) 2020 Brazil Data Cube.
 * OAuth 2.0 is free software; you can redistribute it and/or modify it
    under the terms of the MIT License; see LICENSE file for more details.
 */

import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

import { init as initApm } from 'elastic-apm-js-base';
initApm({
  serviceName: 'oauth_app',
  logLevel: 'error',
  active: false,
  serverUrl: window['__env'].urlAPMServer,
})

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
