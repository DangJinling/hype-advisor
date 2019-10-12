import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const server = 'http://35.230.8.228:8000';

export async function addMember(member) {
    let response = axios.post(`${server}/api/subscribed/`, member);
    return response;
}
