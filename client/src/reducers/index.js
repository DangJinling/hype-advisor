import { combineReducers } from 'redux';
import auth from './auth';
import subscribedUsers from './subscribedUsers';

export default combineReducers({
    auth,
    subscribedUsers
});