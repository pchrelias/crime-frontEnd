import axios from 'axios';

// Base URL for your backend API
const BASE_URL = 'http://localhost:8080/crime';

// Create an Axios instance
const api = axios.create({
    baseURL: BASE_URL,
});

// Interceptor to attach the Authorization token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
        if (token) {
            console.log('api.js Token ' + JSON.stringify(token));
            console.log('api.js Token token ' + token);
            config.headers.Authorization = `Bearer ${token}`;

        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signup`, userData); // Adjusted endpoint
        console.log('registerUser: response.data = ' + response.data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response?.data || error.message);
        throw error;
    }
};

// Function to fetch query results
export const fetchQueryResults = async (endpoint, params) => {
    try {

        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
        console.log('api '+JSON.stringify(api.defaults));
        console.log('params ' + JSON.stringify(params));
        console.log('fetchQueryResults: endpoint = ' + endpoint);
        const response = await api.get(`${BASE_URL}/crime/${endpoint}`, { params });
        console.log('fetchQueryResults: response.data = ' + response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching query results:', error.response?.data || error.message);
        throw error;
    }
};
