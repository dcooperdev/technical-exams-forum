import * as PublicationsActions from './publication.actions';
import { Publication } from 'src/app/Interfaces/publication.interface';

export interface Publications {
  publications: Publication[];
}

const initPublications: Publications = {
  publications: []
};

export function publicationReducer( state = initPublications, action: PublicationsActions.Actions ): Publications {

  switch ( action.type ) {

    case PublicationsActions.SET_PUBLICATION:
      return {
        publications: [ ...state.publications, action.publication  ]
      };

    case PublicationsActions.SET_PUBLICATIONS:
      return {
        publications: [ ...action.list ]
      };

    case PublicationsActions.DELETE_PUBLICATIONS:
      return {
        publications: [ ...state.publications.filter( publication => publication._id !== action.id ) ]
      };

    case PublicationsActions.UNSET_PUBLICATIONS:
      return {
        publications: []
      };

    case PublicationsActions.UPDATE_PUBLICATION:
      return {
        publications: [
          ...state.publications.map( pub => {
            if ( pub._id === action.publication._id ) {
              return {
                ...action.publication
              }
            }else{
              return pub
            }
          })
        ]
      };

    default:
      return state;
  }
}
