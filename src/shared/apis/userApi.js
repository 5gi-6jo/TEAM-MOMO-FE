import axios from 'axios';

class UserApi {
  constructor() {
    // this.base = 'https://www.seoultaste.click';
    this.base = process.env.REACT_APP_BE_IP_LYW;
  }

  getToken = () => sessionStorage.getItem('token');

  async register(data) {
    const registerConfig = {
      method: 'post',
      url: `${this.base}/users/signup`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    return axios(registerConfig)
      .then(res => {
        console.log(res);
        return res.data;
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  async login(data) {
    const loginConfig = {
      method: 'post',
      url: `${this.base}/users/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    return axios(loginConfig)
      .then(res => {
        console.log(res);
        console.log(res.headers.authorization);
        sessionStorage.setItem('token', res.headers.authorization);
        return res;
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  async logout() {
    const logoutConfig = {
      method: 'post',
      url: `${this.base}/users/logout`,
      headers: {},
    };

    return axios(logoutConfig)
      .then(res => {
        console.log(res);
        return true;
      })
      .catch(err => {
        console.log(err.response);
        return false;
      });
  }

  async getUserbyToken() {
    const getUserbyTokenConfig = {
      method: 'get',
      url: `${this.base}/users`,
      headers: {
        Authorization: this.getToken(),
      },
    };

    return axios(getUserbyTokenConfig)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err.response);
        return false;
      });
  }
  async setFCMToken({ FCMToken }) {
    const data = {
      token: sessionStorage.getItem('FCMtoken'),
    };
    const setFCMTokenConfig = {
      method: 'post',
      url: `${this.base}/users/device`,
      headers: {
        Authorization: this.getToken(),
      },
      data: JSON.stringify(data),
    };
    console.log(FCMToken);

    return axios(setFCMTokenConfig)
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err => {
        console.log(err.response);
        return false;
      });
  }
}

export default UserApi;
