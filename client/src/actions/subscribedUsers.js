import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const server = 'http://localhost:8000';

export async function addSubscribedUser(member) {
    let response = axios.post(`${server}/api/subscribed/`, member);
    return response;
}

export async function getSubscribedUser() {
    let response = axios.get(`${server}/api/subscribed`);
    return response;
}