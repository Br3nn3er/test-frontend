export interface Event<Value> {
  on(listener: Listener<Value>): void;
  once(listener: Listener<Value>): void;
  off(listener: Listener<Value>): void;
  trigger(data: Value): void;
}

export type Listener<Value> = (event: CustomEvent<Value>) => void;
