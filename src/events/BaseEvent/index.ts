import { Event, Listener } from './types';

export abstract class BaseEvent<Value> implements Event<Value> {
  protected eventName: string;

  constructor(eventName: string) {
    this.eventName = eventName;
  }

  on(listener: Listener<Value>) {
    window.addEventListener(this.eventName, listener);
  }

  once(listener: Listener<Value>) {
    const handleEventOnce = (event: CustomEvent<Value>) => {
      listener(event);
      this.off(handleEventOnce);
    };

    this.on(handleEventOnce);
  }

  off(listener: Listener<Value>) {
    window.removeEventListener(this.eventName, listener);
  }

  trigger(data: Value) {
    const event = new CustomEvent(this.eventName, { detail: data });
    window.dispatchEvent(event);
  }
}
