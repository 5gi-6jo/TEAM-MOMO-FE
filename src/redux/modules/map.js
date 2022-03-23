import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../../shared/apis/API';
export const getPlans = createAsyncThunk(
  'plan/getPlans',
  async (data, { rejectWithValue }) => {
    try {
      return await URL.post(`/plans/main`, data, {
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

export const planSlice = createSlice({
  name: 'map',
  initialState: {
    plans: [],
    showplan: [],
    images: [],
  },
  reducers: {
    // getPlans: (state, action) => {
    //   const planlist = action.payload;
    //   state.data = planlist;
    // },
    // getOnePlan: (state, action) => {
    //   console.log(state, action.payload);
    //   state.plan.data.push(action.payload);
    // },
    setOnePlan: (state, action) => {
      state.showplan = { ...state.showplan, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(getPlans.fulfilled, (state, action) => {
      state.plans = action.payload;
    });
  },
});
export const {} = planSlice.actions;

export default planSlice.reducer;
