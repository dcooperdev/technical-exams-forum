import { Like } from './../../Interfaces/publication.interface';
import { Action } from '@ngrx/store';
import { Publication } from 'src/app/Interfaces/publication.interface';

export const SET_PUBLICATION = '[PUBLICATIONS] Add a publication';
export const SET_PUBLICATIONS = '[PUBLICATIONS] Add publications';
export const DELETE_PUBLICATIONS = '[PUBLICATIONS] Delete publication';
export const UNSET_PUBLICATIONS = '[PUBLICATIONS] Empty publications list';
export const UPDATE_PUBLICATION = '[PUBLICATIONS] Update publication';

export class SetPublication implements Action {
  readonly type = SET_PUBLICATION;

  constructor( public publication: Publication ) {}
}

export class SetPublications implements Action {
  readonly type = SET_PUBLICATIONS;

  constructor( public list: Publication[] ) {}
}

export class DeletePublication implements Action {
  readonly type = DELETE_PUBLICATIONS;

  constructor( public id: string ) {}
}

export class UnsetPublications implements Action {
  readonly type = UNSET_PUBLICATIONS;

  constructor() {}
}

export class UpdatePublication implements Action {
  readonly type = UPDATE_PUBLICATION;

  constructor( public publication: Publication) {}
}

export type Actions = SetPublication | SetPublications | DeletePublication | UnsetPublications | UpdatePublication;
