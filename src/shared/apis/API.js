import axios from 'axios';
import { getCookie, setCookie } from '../utils/Cookie';

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
    const originalRequest = error.config;
    if (
      error.response.data.message === '만료된 JWT 입니다.' &&
      !originalRequest._retry
    ) {
      console.log('로그인정보를 갱신합니다.');
      const data = {
        accessToken: getCookie('token'),
      };
      const { response } = await axios
        .get(`${process.env.REACT_APP_BE_IP_LYW}/users/reissue`, {
          withCredentials: true,
          headers: {
            Authorization: getCookie('token'),
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          // console.log(res);

          setCookie('token', res.headers.authorization);
          originalRequest.headers['Authorization'] = getCookie('token');
          return axios(originalRequest);
        })
        .catch(error => {
          // console.log(error.response);
        });
      return axios(originalRequest);
    }
    return error;
  },
);
export { URL, tokenURL };
