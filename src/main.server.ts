import { bootstrapApplication } from '@angular/platform-browser';
import { Homepage } from './app/homepage/homepage';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(Homepage, config);

export default bootstrap;
