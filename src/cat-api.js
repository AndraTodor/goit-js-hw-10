import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': 'al  tau',
  },
});
