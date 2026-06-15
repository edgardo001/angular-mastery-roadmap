import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { EventBusService } from './events/event-bus';
import { EventLogger } from './events/event-logger';
import { OrderSaga } from './sagas/order-saga';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    EventBusService,
    EventLogger,
    OrderSaga,
  ],
};
