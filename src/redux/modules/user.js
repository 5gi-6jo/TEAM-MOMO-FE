import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from '../../shared/apis/userApi';
import axios from 'axios';
import { URL } from '../../shared/apis/API';
// import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router';

export const register = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      return await URL.post(`/users/signup`, data).then(response => response);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      return await URL.post(`/users/login`, data).then(response => {
        console.log(response);
        if (response.status === 201) {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('nickname', response.data.data.nickname);
          window.location.replace('/');
        }
        sessionStorage.setItem('nickname', response.data.nickname);
      });
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('nickname');
});

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

// export const sighupAxios = createAsyncThunk(
//   'user/sighupAxios',
//   async ({ registerData, navigate }) => {
//     await Userapi.signUp({ registerData, navigate });
//   },
// );

// export const signinAxios = createAsyncThunk(
//   'user/sighinAxios',
//   async ({ loginData, navigate }, { dispatch }) => {
//     const userData = await Userapi.signIn({ loginData, navigate });
//     console.log(loginData);
//     console.log(userData.data.data);
//     const data = {
//       email: loginData.email,
//       nickname: userData.data.data.nickname,
//     };
//     console.log(data);
//     dispatch(setUserToSession(data));
//     // navigate('/', { replace: true });

//     return data;
//   },
// );

// export const logoutAxios = createAsyncThunk(
//   'user/logoutAxios',
//   async ({ navigate }, { dispatch }) => {
//     dispatch(deleteUserFromSession());
//     navigate('/', { replace: true });
//     return true;
//   },
// );

const Userapi = new UserApi();
export const setFCMTokenAxios = createAsyncThunk(
  'plan/setFCMTokenAxios',
  async ({ registerData, navigate }) => {
    console.log(registerData);
    await Userapi.setFCMToken({ registerData, navigate });
  },
);

export const getUserbyToken = createAsyncThunk(
  'user/getUserbyToken',
  async ({ navigate }, { dispatch }) => {
    const Data = await Userapi.getUserbyToken({ navigate });
    return Data.data.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_info: {},
    is_login: false,
    loginError: '',
    registerError: '',
  },
  reducers: {
    setUserName: (state, action) => {
      state.user_info.nickname = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      //회원가입
      .addCase(register.pending, state => {
        state.registerDone = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.registerDone = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerDone = false;
        state.registerError = action.payload;
      })
      //로그인
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user_info = action.payload;
        state.isLoading = false;
        state.isLoggedin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = true;
        state.loginError = action.payload;
      })
      // 로그아웃
      .addCase(logout.fulfilled, state => {
        state.isLoggedin = false;
      })
      .addCase(getUserbyToken.fulfilled, (state, action) => {
        state.is_login = true;
        state.user_info = action.payload;
      });
  },
});

const actionCreators = { KakaoLogin };
export { actionCreators };
export const { setUserName } = userSlice.actions;

export default userSlice.reducer;
