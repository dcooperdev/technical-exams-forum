import * as postsTypes from './actionTypes';

const initialState = {
    token: null,
    profile: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case postsTypes.SET_USER:
            return {
                ...state,
                token: action.payload.token,
                profile: action.payload.profile,
            }
        case postsTypes.REMOVE_USER:
            return {
                ...state,
                token: null,
                profile: null
            }
        default:
            return state;
    }
}