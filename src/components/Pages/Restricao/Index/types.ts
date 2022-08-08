import { Ministra } from '@models/Ministra';

export interface MinistraWithOrigin extends Ministra {
  origin: Origin;
}

export type Origin =
  | 'LOGGED_USER_QUEUE_DISCIPLINES'
  | 'LOGGED_USER_NOT_QUEUE_DISCIPLINES'
  | 'PROFESSOR';
