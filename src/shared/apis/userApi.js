import axios, { Axios } from 'axios';

class UserApi {
  constructor() {
    // this.base = process.env.REACT_APP_BE_IP_LYW;
    this.base = 'https://www.seoultaste.click';
  }

  getToken = () => sessionStorage.getItem('token');

  async signUp({ registerData, navigate }) {
    const sighupConfig = {
      method: 'post',
      url: `${this.base}/users/signup`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(registerData),
    };

    return axios(sighupConfig)
      .then(res => {
        console.log(res);
        alert(res.data.msg);
        navigate('/login', { replace: true });
        return res.data;
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.msg);
      });
  }

  async signIn({ loginData, navigate }) {
    const signinConfig = {
      method: 'post',
      url: `${this.base}/users/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(loginData),
    };

    return axios(signinConfig)
      .then(res => {
        console.log(res);

        // alert(res.data.msg);
        navigate('/', { replace: true });
        console.log(res.headers.authorization);
        // axios.defaults.headers.common['Authorization'] =
        //   res.headers.authorization;
        sessionStorage.setItem('token', res.headers.authorization);
        return res.headers.authorization;
      })
      .catch(err => {
        // alert(err.response.data.msg);
        console.log(err.response);
      });
  }

  async signOut({ navigate }) {
    const signoutConfig = {
      method: 'post',
      url: `${this.base}/api/logout`,
      headers: {
        'X-AUTH-TOKEN': this.getToken(),
      },
    };

    return axios(signoutConfig)
      .then(res => {
        console.log(res);
        alert('로그아웃에 성공하셨습니다');
        navigate('/', { replace: true });
        return true;
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.msg);
        return false;
      });
  }
}

export default UserApi;
