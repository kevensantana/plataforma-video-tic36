import { ApplicationConfig, ValueProvider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(), 
    provideHttpClient(),
    // SNACK_BAR_CONFIG,
    provideRouter(routes), 
    provideAuth0({
      domain: 'dev-f1zzvbzr7emietli.us.auth0.com',
      clientId: 'CpKzLJ2sOFvnzXaRa0AotegNHxTbSpg1',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-f1zzvbzr7emietli.us.auth0.com/api/v2/',
        scope: 'openid profile email offline_access',
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    }),
  ],
};


