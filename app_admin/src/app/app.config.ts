import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptProvider } from './utils/jwt.interceptor';  // Import your interceptor provider

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // Ensure interceptors are included
    authInterceptProvider,
  ]
};
