import { combineReducers } from 'redux';
import auth from './auth';
import subscribedUsers from './subscribedUsers';
import investment from './investment';

export default combineReducers({
    auth,
    subscribedUsers,
    investment
});