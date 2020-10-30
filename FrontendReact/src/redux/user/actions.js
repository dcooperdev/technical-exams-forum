import * as postsTypes from './actionTypes';

export const setUser = user => {
    return {
        type: postsTypes.SET_USER,
        payload: user
    }
}

export const removeUser = () => {
    return {
        type: postsTypes.REMOVE_USER
    }
}