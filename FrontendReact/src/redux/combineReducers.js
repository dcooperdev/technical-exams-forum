import { combineReducers } from 'redux'
import common from './common';
import posts from './posts';
import user from './user';

export default combineReducers({
    common,
    posts,
    user
});
