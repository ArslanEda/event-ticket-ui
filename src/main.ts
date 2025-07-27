import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.route';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeTr);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'tr' } 
  ]
}).catch(err => console.error(err));
