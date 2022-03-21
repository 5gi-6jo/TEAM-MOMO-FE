import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    marker: '',
    is_footer: true,
    publicChats: [],
    des: '',
  },
  reducers: {
    setMarkerRedux: (state, action) => {
      state.marker = action.payload;
    },
    setFooterView: (state, action) => {
      if (state.is_footer !== action.payload) state.is_footer = action.payload;
    },
    setPublicChats: (state, action) => {
      state.publicChats.push(action.payload);
    },
    setDestination: (state, action) => {
      state.des = action.payload;
    },
  },
  extraReducers: builder => {},
});
export const { setMarkerRedux, setFooterView, setPublicChats, setDestination } =
  mainSlice.actions;

export default mainSlice.reducer;
