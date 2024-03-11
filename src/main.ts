/// <reference types="@angular/localize" />

/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import routeConfig from './app/routes';


bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(),
    provideRouter(routeConfig), 
    provideAnimationsAsync(),
    provideHttpClient(), importProvidersFrom(HttpClientModule), provideAnimationsAsync()
  ],
}).catch((err) => console.error(err));