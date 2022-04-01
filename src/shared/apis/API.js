import axios from 'axios';
import { getCookie } from '../utils/Cookie';

const URL = axios.create({
  baseURL: process.env.REACT_APP_BE_IP_LYW,

  // headers: {
  //   Authorization: sessionStorage.getItem('token'),
  //   'Content-Type': 'application/json',
  // },
});

//일딴 주석후 합칠때 주석해제
/* eslint-disable no-param-reassign */
// URL.interceptors.request.use(function (config) {
//   const accessToken = getCookie('token');
//   config.headers.common.Authorization = `Bearer ${accessToken}`;
//   return config;
// });

export { URL };
