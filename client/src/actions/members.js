import axios from 'axios';

export const addMember = (member) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let response = axios.post(`127.0.0.0:8000/api/members/`, member, config);
    return response;
}
