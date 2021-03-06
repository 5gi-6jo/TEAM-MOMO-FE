import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { tokenURL, URL } from '../../shared/apis/API';
import { deleteCookie, setCookie } from '../../shared/utils/Cookie';
// import { useHistory } from 'react-router';

export const register = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      return await URL.post(`/users/signup`, data).then(response => {
        window.location.assign('/login');

        return response;
      });
    } catch (error) {
      window.alert(error.response.data.message);

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
      return await URL.post(`/users/login`, data, {
        withCredentials: true,
      }).then(response => {
        setCookie('token', response.headers.authorization, 1);
        // sessionStorage.setItem('token', response.headers.authorization);
        setTimeout(() => {});
        window.location.assign('/main');
        // console.log('asdf');

        return response.data.data;
      });
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message);

      return rejectWithValue(error.response);
    }
  },
);

export const logout2 = createAsyncThunk('user/logout', async () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('nickname');
  deleteCookie('token');
});

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const data = {
      data: '',
    };
    try {
      return await tokenURL.post(`/users/logout`, data).then(response => {
        deleteCookie('token');
        setTimeout(() => window.location.assign('/'), 1000);
      });
    } catch (error) {
      window.alert(error.response.data.message);
      deleteCookie('token');

      console.log(error);
      return rejectWithValue(error.response);
    }
  },
);

// const Userapi = new UserApi();
// export const setFCMTokenAxios = createAsyncThunk(
//   'plan/setFCMTokenAxios',
//   async ({ registerData, navigate }) => {
//     console.log(registerData);
//     await Userapi.setFCMToken({ registerData, navigate });
//   },
// );
export const setFCMToken = createAsyncThunk(
  'plan/setFCMToken',
  async (data, { rejectWithValue }) => {
    try {
      return await tokenURL.post(`/users/devices`, data).then(response => {
        return response.data.data;
      });
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);
export const isFCMToken = createAsyncThunk(
  'plan/isFCMToken',
  async (data, { rejectWithValue }) => {
    try {
      return await tokenURL
        .post(`/users/alarms`, data)
        .then(response => response.data.data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUserbyToken = createAsyncThunk(
  'user/getUserbyToken',
  async (_, { rejectWithValue }) => {
    try {
      return await tokenURL
        .get(`/users`, { withCredentials: true })
        .then(response => {
          return response.data.data;
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_info: {
      nickname: '',
    },
    is_login: false,
    loginError: '',
    registerError: '',
    isLoggedin: false,
  },
  reducers: {
    setUserName: (state, action) => {
      state.user_info.nickname = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      //????????????
      .addCase(register.pending, state => {
        state.registerDone = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerDone = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerDone = false;
        state.registerError = action.payload;
      })
      //?????????
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
      // ????????????
      .addCase(logout.fulfilled, state => {
        const user_info = {
          nickname: '',
        };
        state.user_info = user_info;
        state.is_login = false;
        state.isLoggedin = false;
      })
      .addCase(setFCMToken.fulfilled, (state, action) => {})
      .addCase(isFCMToken.fulfilled, (state, action) => {})
      .addCase(getUserbyToken.fulfilled, (state, action) => {
        state.is_login = true;
        state.user_info = action.payload;
      });
  },
});

export const { setUserName } = userSlice.actions;
export const KakaoLogin = code => {
  return function () {
    axios({
      method: 'GET',
      url: `https://seoultaste.click/users/kakao/callback?code=${code}`,
    })
      .then(response => {
        const ACCESS_TOKEN = response.headers.authorization;

        // localStorage.setItem('token', ACCESS_TOKEN);

        setCookie('token', ACCESS_TOKEN, 1);

        debugger;
      })
      .catch(err => {
        console.log('??????????????? ??????', err);
        // debugger;

        window.location.assign('/');
      });
  };
};
const actionCreators = { KakaoLogin };
export { actionCreators };

export default userSlice.reducer;
