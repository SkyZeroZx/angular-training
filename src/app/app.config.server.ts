import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    /** withEventReplay()
     * When doing so, Angular will add a JS script at the top of your HTML page, whose job is to replay events that happened during the hydration phase.
     * To do so, it adds a listener at the root of the document, and listens to a set of events that can happen on the page using event delegation.
     * It does know which events it needs to listen to, as Angular collected them when rendering the page on the server.
     * So for example, if you render a page that contains elements which have a (click) or a (dblclick) handler, Angular will add listeners for these events:
     * <script>window.__jsaction_bootstrap('ngContracts', document.body, "ng", ["click","dblclick"]);</script>
     **/
    provideClientHydration(withEventReplay()),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
