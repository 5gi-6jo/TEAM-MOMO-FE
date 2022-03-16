import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../../shared/apis/API';
import PlanApi from '../../shared/apis/planApi';

const Planapi = new PlanApi();

export const getPlans = createAsyncThunk(
  'plan/getPlans',
  async (_, { rejectWithValue }) => {
    try {
      return await URL.get(`/plans/main`, _).then(
        response => response.data.data,
      );
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);
// export const getPlansAxios = createAsyncThunk(
//   'plan/getPlansAxios',
//   async (_, { dispatch }) => {
//     //로딩
//     const resp = await Planapi.getPlans();
//     // dispatch(getPlans(resp));
//     return resp;
//   },
// );

// export const getOnePlanAxios = createAsyncThunk(
//   'plan/getOnePlanAxios',
//   async (planId, { dispatch }) => {
//     //로딩
//     const res = await Planapi.getOnePlan({ planId, dispatch });
//     console.log('plan_modules', res);
//     return res;
//   },
// );
export const getOnePlan = createAsyncThunk(
  'plan/getOnePlan',
  async (planId, { rejectWithValue }) => {
    try {
      return await URL.get(`/plans/1`, planId).then(
        response => response.data.data,
      );
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const planSlice = createSlice({
  name: 'plan',
  initialState: {
    plans: [],
    showplan: [],
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
  },
  extraReducers: builder => {
    builder
      .addCase(getPlans.fulfilled, (state, action) => {
        state.plans = action.payload;
      })
      .addCase(getOnePlan.fulfilled, (state, action) => {
        state.showplan = action.payload;
      });
    // [getPlansAxios.fulfiled]: (state, action) => {
    //   //
    // },
    // [getOnePlanAxios.fulfiled]: (state, action) => {
    //   console.log(state, action.payload);
    //   state.plan.data.push(action.payload);

    //   state.plan.data = action.payload;
    //   //
    // },
  },
});

export default planSlice.reducer;
