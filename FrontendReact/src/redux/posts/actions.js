import * as postsTypes from './actionTypes';

export const setPosts = posts => {
    return {
        type: postsTypes.SET_POSTS,
        payload: posts
    }
}

export const addPosts = post => {
    return {
        type: postsTypes.ADD_POST,
        payload: post
    }
}

export const updatePosts = post => {
    return {
        type: postsTypes.UPDATE_POST,
        payload: post
    }
}