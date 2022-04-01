import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from '../../shared/apis/userApi';
import axios from 'axios';
import { URL } from '../../shared/apis/API';
import { useNavigate } from 'react-router-dom';
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
      // const navigate = useNavigate();
      console.log('test1', data);
      return await URL.post(`/users/login`, data).then(response => {
        console.log(response);
        console.log('test2');
        sessionStorage.setItem('token', response.headers.authorization);
        console.log('test1');

        return response.data.data;
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

const Userapi = new UserApi();
export const setFCMTokenAxios = createAsyncThunk(
  'plan/setFCMTokenAxios',
  async ({ registerData, navigate }) => {
    console.log(registerData);
    await Userapi.setFCMToken({ registerData, navigate });
  },
);
export const setFCMToken = createAsyncThunk(
  'plan/setFCMToken',
  async (data, { rejectWithValue }) => {
    try {
      return await URL.post(`/users/devices`, data, {
        headers: {
          Authorization: sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      }).then(response => response.data.data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
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
        console.log('pending');

        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('fullfilled');

        state.user_info = action.payload;
        state.isLoading = false;
        state.isLoggedin = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('rejected');

        state.isLoading = true;
        state.loginError = action.payload;
      })
      // 로그아웃
      .addCase(logout.fulfilled, state => {
        state.isLoggedin = false;
      })
      .addCase(setFCMToken.fulfilled, (state, action) => {})
      .addCase(getUserbyToken.fulfilled, (state, action) => {
        state.is_login = true;
        state.user_info = action.payload;
      });
  },
});

export const { setUserName } = userSlice.actions;
export const KakaoLogin = code => {
  const navigate = useNavigate();
  return function () {
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

export default userSlice.reducer;
