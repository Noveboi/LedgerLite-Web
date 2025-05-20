import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInteceptor } from './core/interceptors/http.authInterceptor';
import { GlobalErrorHandlerService } from './core/services/errors/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInteceptor])
    ),
    {
      provide: ErrorHandler, useClass: GlobalErrorHandlerService
    }]
};
