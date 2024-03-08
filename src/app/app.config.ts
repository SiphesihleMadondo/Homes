import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import routeConfig from './routes';
import { provideHttpClient, HttpClientModule, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routeConfig), provideClientHydration(),
    provideHttpClient(withFetch()), importProvidersFrom(HttpClientModule)]
};
