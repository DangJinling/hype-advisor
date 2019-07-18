import { ADD_MEMBER } from '../actions/types.js';

const initialState = {
    members: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MEMBER:
            return {
                ...state,
                members: [...state.members, action.payload]
            }
        default:
            return state;
    }
}