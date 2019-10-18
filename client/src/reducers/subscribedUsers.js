import { ADD_MEMBER } from '../actions/types.js';

const initialState = {
    subscribedUsers: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MEMBER:
            return {
                ...state,
                subscribedUsers: [...state.subscribedUsers, action.payload]
            }
        default:
            return state;
    }
}