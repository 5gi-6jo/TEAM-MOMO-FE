import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    marker: '',
    is_footer: true,
    publicChats: [],
    publicMaps: [],

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
    setPublicChats: (state, action) => {
      if (!state.is_public_send) {
        state.is_public_send = true;
        state.publicChats.push(action.payload);
        state.is_public_send = false;
      }
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
