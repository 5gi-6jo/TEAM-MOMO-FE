import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    marker: '',
    is_footer: true,
  },
  reducers: {
    setMarkerRedux: (state, action) => {
      state.marker = action.payload;
    },
    setFooterView: (state, action) => {
      if (state.is_footer !== action.payload) state.is_footer = action.payload;
    },
    // getPlans: (state, action) => {
    //   const planlist = action.payload;
    //   state.data = planlist;
    // },
    // getOnePlan: (state, action) => {
    //   console.log(state, action.payload);
    //   state.plan.data.push(action.payload);
    // },
  },
  extraReducers: builder => {},
});
export const { setMarkerRedux, setFooterView } = mainSlice.actions;

export default mainSlice.reducer;
