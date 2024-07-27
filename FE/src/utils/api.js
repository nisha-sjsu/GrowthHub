import axios from 'axios';
import { aToken } from '../config';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Authorization': `Bearer ${aToken}`,
        'Content-Type': 'application/json',
        'token': aToken
    }
});

instance.interceptors.request.use(config => {
    const authToken = aToken;
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;

const baseURL = 'http://localhost:3001';
const headers = new Headers({
    'token': aToken
});

export async function fetchApi(endpoint) {
    const url = `${baseURL}${endpoint}`;
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response; // Assuming the server responds with JSON
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}