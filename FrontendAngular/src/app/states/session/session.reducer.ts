import { User } from 'src/app/Interfaces/user.interface';
import * as SessionActions from './session.actions';

export interface Session {
  token: string;
  user: User;
}

const initSession: Session = {
  token: '',
  user: null
};

export function sessionReducer( state = initSession, action: SessionActions.Actions ): Session {

  switch ( action.type ) {

    case SessionActions.SET_SESSION:
      return {
        token: action.token,
        user: action.user
      };

    case SessionActions.UNSET_SESSION:
      return {
        token: '',
        user: null
      };

    default:
      return state;
  }
}
