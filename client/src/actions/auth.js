import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const server = 'http://127.0.0.1:8000';

export async function login(body) {
    let response = axios.post(`${server}/api/auth/login`, body);
    return response;
}


export async function register(body) {
    let response = axios.post(`${server}/api/auth/register`, body);
    return response;
}