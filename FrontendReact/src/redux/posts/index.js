import * as postsTypes from './actionTypes';

const initialState = {
    list: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case postsTypes.SET_POSTS:
            return {
                ...state,
                list: action.payload
            }
        case postsTypes.ADD_POST:
            return {
                ...state,
                list: [
                    ...state.list,
                    action.payload
                ]
            }
        case postsTypes.UPDATE_POST:
            return {
                ...state,
                list: [
                    ...state.list.map(post => {
                        if (post._id === action.payload._id) {
                            return action.payload
                        }
                        return post
                    })
                    
                ]
            }
        default:
            return state;
    }
}