import { Action } from '@ngrx/store';
import { User } from 'src/app/Interfaces/user.interface';

export const SET_SESSION = '[SESSION] Add user data';
export const UNSET_SESSION = '[SESSION] Session closed';

export class SetSession implements Action {
  readonly type = SET_SESSION;

  constructor( public token: string, public user: User ) {}
}

export class UnsetSession implements Action {
  readonly type = UNSET_SESSION;

  constructor() {}
}

export type Actions = SetSession | UnsetSession;
