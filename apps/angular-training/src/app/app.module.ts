import { interceptorsProviders } from '@/core/interceptor';
import { SpinnerComponent, ToastModule } from '@/shared/ui';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ContentModule } from './layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ContentModule,
    BrowserModule,
    SpinnerComponent,
    ToastModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      useHash: true,
    }),
  ],
  providers: [
    ...interceptorsProviders,
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),// interceptors from DI allow usage of interceptors based in Class
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
