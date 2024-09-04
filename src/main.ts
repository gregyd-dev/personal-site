import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { Homepage } from './app/homepage/homepage';

bootstrapApplication(Homepage, appConfig)
  .catch((err) => console.error(err));
