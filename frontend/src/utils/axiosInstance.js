import axios from 'axios';

import { API_BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Set a timeout of 10 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Add a request interceptor to include the Authorization header if token is available
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle specific error statuses
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // redirect to login or show an error message
                window.location.href = '/login';
                console.error("Unauthorized access - perhaps your token is invalid?");
                break;
            case 404:
                console.error("Resource not found");
                break;
            case 500:
                console.error("Internal server error - please try again later");
                break;  
            default:
                console.error("An error occurred:", error.response.data);
        }
    }
    return Promise.reject(error);
});

export default axiosInstance;
