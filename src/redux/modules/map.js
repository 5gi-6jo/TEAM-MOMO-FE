import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../../shared/apis/API';
export const getPlanId = createAsyncThunk(
  'map/getPlanId',
  async (data, { rejectWithValue }) => {
    try {
      return await URL.get(`/meets/${data}`, {
        headers: {
          Authorization: sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      }).then(response => response.data.data.planId);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    planId: '',
    showplan: [],
    images: [],
    publicMaps: [],
  },
  reducers: {
    setPublicMaps: (state, action) => {
      let index = state.publicMaps.findIndex(
        e =>
          e.sender === action.payload.sender && e.type === action.payload.type,
      );
      if (index !== -1) {
        state.publicMaps[index] = action.payload;
      } else {
        state.publicMaps.push(action.payload);
      }
      console.log('index', index);

      // if (index !== -1) {
      //   state.publicChats.push(action.payload);
      // } else state.publicMaps[index] = action.payload;
    },
    // getOnePlan: (state, action) => {
    //   console.log(state, action.payload);
    //   state.plan.data.push(action.payload);
    // },
    setOnePlan: (state, action) => {
      state.showplan = { ...state.showplan, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(getPlanId.fulfilled, (state, action) => {
      state.planId = action.payload;
    });
  },
});
export const { setPublicMaps } = mapSlice.actions;

export default mapSlice.reducer;
