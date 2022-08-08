import { BaseEvent } from '@events/BaseEvent';
import { Value } from './types';

export class RefreshPage extends BaseEvent<Value> {
  constructor() {
    super('TOKEN_REFRESHED');
  }

  trigger() {
    super.trigger({ status: true });
  }
}
