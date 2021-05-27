const axios = require('axios');


export const API_URL = process.env.REACT_APP_API_URL;

export const api = (config) => {
    const token = localStorage.getItem("accessToken");
    const header = config && token ? { ...config, 'Authorization': `Bearer ${token}` } : token
        ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' };

    return axios.create({
        baseURL: API_URL,
        headers: header
    });
};
