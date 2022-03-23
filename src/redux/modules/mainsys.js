import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    marker: '',
    is_footer: true,
    publicChats: [],
    des: '',
    calendarDay: moment().format().split('+')[0],
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
    setCalendarDay: (state, action) => {
      state.calendarDay = action.payload;
    },
  },
  extraReducers: builder => {},
});
export const {
  setMarkerRedux,
  setFooterView,
  setPublicChats,
  setDestination,
  setCalendarDay,
} = mainSlice.actions;

export default mainSlice.reducer;
