import axios from 'axios';

class PostApi {
  constructor() {
    // this.base = 'http://localhost:3000';
    // this.base = process.env.REACT_APP_BE_IP_LYW;
    this.base = process.env.REACT_APP_BE_IP_JYH;
  }

  // async getPosts() {
  //   const getpostConfig = {
  //     method: 'get',
  //     url: `${this.base}/api/board`,
  //     headers: {},
  //   };

  //   return axios(getpostConfig)
  //     .then(res => {
  //       console.log(res);
  //       return res.data;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       console.log(err.messages);
  //     });
  // }
}
export default PostApi;

// export const userApi = {
//   //회원가입
//   signup: data => {
//     instance.post('user/signup', {
//       userEmail: data.id,
//       password: data.pwd,
//       nickname: data.user_name,
//     });
//   },
//   login: data =>
//     instance.post('user/login', {
//       username: data.id,
//       password: data.pwd,
//     }),
// };

// export { instance, token, settoken };
