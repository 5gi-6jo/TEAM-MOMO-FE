import axios from 'axios';

export const URL = axios.create({
  baseURL: process.env.REACT_APP_BE_IP_LYW,

  headers: {
    Authorization: sessionStorage.getItem('token'),
    'Content-Type': 'application/json',
  },
});
