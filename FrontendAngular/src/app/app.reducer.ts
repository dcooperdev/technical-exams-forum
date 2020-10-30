import { ActionReducerMap } from '@ngrx/store';
import { Session, sessionReducer } from './states/session/session.reducer';
import { Publications, publicationReducer } from './states/publications/publication.reducer';


export interface AppState {
  session: Session;
  blog: Publications;
}

export const appReducers: ActionReducerMap<AppState> = {
  session: sessionReducer,
  blog: publicationReducer
};
