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
    setPublicMaps: (state, action) => {
      let index = state.publicMaps.findIndex(e => {
        // if(e.sender === action.payload.sender)
        console.log(e);
      });
      console.log('index', index);

      if (index !== -1) {
        state.publicChats.push(action.payload);
      } else state.publicMaps[index] = action.payload;
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
  setPublicMaps,
  setDestination,
  setCalendarDay,
} = mainSlice.actions;

export default mainSlice.reducer;
