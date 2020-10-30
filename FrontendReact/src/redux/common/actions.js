import * as commonTypes from './actionTypes';

export const setLoading = isLoading => {
    return {
        type: commonTypes.SET_LOADING,
        payload: isLoading
    }
}