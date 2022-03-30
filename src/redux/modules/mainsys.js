import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    marker: '',
    is_footer: true,
    publicMaps: [],
    isChating: false,
    is_public_send: false,
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

    setIsChating: (state, action) => {
      state.isChating = action.payload;
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
  setIsChating,
  setDestination,
  setCalendarDay,
} = mainSlice.actions;

export default mainSlice.reducer;
