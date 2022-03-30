import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from '../../shared/apis/userApi';
import axios from 'axios';
import { URL } from '../../shared/apis/API';
// import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router';

const Userapi = new UserApi();
export const setFCMTokenAxios = createAsyncThunk(
  'plan/setFCMTokenAxios',
  async ({ registerData, navigate }) => {
    console.log(registerData);
    await Userapi.setFCMToken({ registerData, navigate });
  },
);

export const sighupAxios = createAsyncThunk(
  'user/sighupAxios',
  async ({ registerData, navigate }) => {
    await Userapi.signUp({ registerData, navigate });
  },
);

export const signinAxios = createAsyncThunk(
  'user/sighinAxios',
  async ({ loginData, navigate }, { dispatch }) => {
    const userData = await Userapi.signIn({ loginData, navigate });
    console.log(loginData);
    console.log(userData.data.data);
    const data = {
      email: loginData.email,
      nickname: userData.data.data.nickname,
    };
    console.log(data);
    dispatch(setUserToSession(data));
    // navigate('/', { replace: true });

    return data;
  },
);

export const getUserbyToken = createAsyncThunk(
  'user/getUserbyToken',
  async ({ navigate }, { dispatch }) => {
    const Data = await Userapi.getUserbyToken({ navigate });
    return Data.data.data;
  },
);

export const logoutAxios = createAsyncThunk(
  'user/logoutAxios',
  async ({ navigate }, { dispatch }) => {
    dispatch(deleteUserFromSession());
    navigate('/', { replace: true });
    return true;
  },
);

export const KakaoLogin = code => {
  // const navigate = useNavigate();
  return function ({ navigate }) {
    axios({
      method: 'GET',
      url: `https://seoultaste.click/users/kakao/callback?code=${code}`,
    })
      .then(res => {
        console.log(res); // 토큰이 넘어올 것임

        const ACCESS_TOKEN = res.data.accessToken;

        localStorage.setItem('token', ACCESS_TOKEN); //예시로 로컬에 저장함

        // navigate('/main', { replace: true }); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch(err => {
        console.log('소셜로그인 에러', err);

        // navigate('/login', { replace: true }); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  };
};

const actionCreators = { KakaoLogin };
export { actionCreators };

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_info: {
      nickname: null,
      email: null,
    },
    is_login: false,
  },

  reducers: {
    setUserToSession: (state, action) => {
      state.user_info = action.payload;
    },
    setUserName: (state, action) => {
      state.user_info.nickname = action.payload;
    },
    getUser: (state, action) => {
      state.is_login = true;
    },
    deleteUserFromSession: (state, action) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userId');
    },
  },
  extraReducers: {
    [sighupAxios.fulfilled]: (state, action) => {
      // state = state;
    },
    [signinAxios.fulfilled]: (state, action) => {
      state.is_login = true;
    },
    [logoutAxios.fulfilled]: (state, action) => {
      if (action.payload) {
        state.is_login = false;
      }
      alert('로그아웃 완료');
    },
    [getUserbyToken.fulfilled]: (state, action) => {
      state.is_login = true;
      state.user_info = action.payload;
    },
    [setFCMTokenAxios.fulfilled]: (state, action) => {
      // state = state;
    },
  },
});

export const {
  setUserToSession,
  setMyFCMToken,
  setUserName,
  getUser,
  deleteUserFromSession,
} = userSlice.actions;

export default userSlice.reducer;
