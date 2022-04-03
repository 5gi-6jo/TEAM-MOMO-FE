import axios from 'axios';
import { getCookie } from '../utils/Cookie';

const URL = axios.create({
  baseURL: process.env.REACT_APP_BE_IP_LYW,

  headers: {
    // Authorization: sessionStorage.getItem('token'),
    // 'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const tokenURL = axios.create({
  baseURL: process.env.REACT_APP_BE_IP_LYW,

  // headers: {
  //   Authorization: getCookie('token'),
  //   'Content-Type': 'application/json',
  // },
  withCredentials: true,
});

//일딴 주석후 합칠때 주석해제
/* eslint-disable no-param-reassign */
tokenURL.interceptors.request.use(function (config) {
  const accessToken = getCookie('token');
  config.headers.common.Authorization = `${accessToken}`;
  return config;
});

tokenURL.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.response);
    console.log(error.response.data.message);
    console.log(error.config);
    const originalRequest = error.config;
    if (
      error.response.data.message === '만료된 JWT 입니다.' &&
      !originalRequest._retry
    ) {
      console.log('test');
      const data = {
        accessToken: getCookie('token'),
      };
      const { response } = await tokenURL
        .post(`/users/reissue`, data, {
          withCredentials: true,
          headers: {
            Authorization: getCookie('token'),
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error.response);
        });
      console.log(response);
    }
    return error;
  },
);
export { URL, tokenURL };
