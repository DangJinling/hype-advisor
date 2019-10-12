import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const server = 'http://35.230.8.228:8000';

export async function login(body) {
    let response = axios.post(`${server}/api/auth/login`, body);
    return response;
}


export async function register(body) {
    let response = axios.post(`${server}/api/auth/register`, body);
    return response;
}

export async function getRegisterUser() {
    let response = axios.get(`${server}/api/auth/getUsers`);
    return response;
}


export async function getSubscribedUser() {
    let response = axios.get(`${server}/api/subscribed`);
    return response;
}
