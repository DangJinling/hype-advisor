import axios from 'axios';

import { GET_INVESTMENT } from './types';
import { tokenConfig } from './auth';
const server = 'http://localhost:8000';
const token = localStorage.getItem('token');
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

};

export const getInvestment = () => {
    const response = axios.get(`${server}/api/investment`, config);
    return response;
}

export const getInvestmentByUser = (params) => {
    const response = axios.post(`${server}/api/investment/getInvestmentByUser`, { user: params }, config);
    return response;
}