import axios from 'axios';

const server = 'http://localhost:8000';
const token = localStorage.getItem('token');
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

};

export const getEmailConfig = () => {
    const response = axios.get(`${server}/api/emailConfig/`);
    return response;
}


export const addEmailConfig = (emailConfig) => {
    const response = axios.post(`${server}/api/emailConfig/`, emailConfig);
    return response;
}

export const updateEmailConfig = (emailConfig) => {
    const response = axios.put(`${server}/api/emailConfig/${emailConfig.id}/`, emailConfig);
    return response;
}