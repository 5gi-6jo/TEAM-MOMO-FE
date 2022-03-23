import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../../shared/apis/API';
import { MOCK } from '../../shared/apis/plans';

const ismock = false;
export const getPlans = createAsyncThunk(
  'plan/getPlans',
  async (data, { rejectWithValue }) => {
    try {
      if (ismock) return MOCK.Plans.data;
      console.log(sessionStorage.getItem('token').split('Bearer ')[1]);
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

export const getOnePlan = createAsyncThunk(
  'plan/getOnePlan',
  async (planId, { rejectWithValue }) => {
    try {
      if (ismock) return MOCK.PlanDetail.data;
      return await URL.get(`/plans/${planId}`, {
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
export const setPlans = createAsyncThunk(
  'plan/setPlans',
  async (data, { rejectWithValue }) => {
    try {
      return await URL.post('/plans', data, {
        headers: {
          Authorization: sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      }).then(res => {
        return res.data;
      });
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);
export const editPlans = createAsyncThunk(
  'plan/editPlans',
  async (data, { rejectWithValue }) => {
    try {
      return await URL.put(`/plans/${data.id}`, data, {
        headers: {
          Authorization: sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      }).then(res => {
        console.log(res);
        // setOnePlan(data);
      });
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const setUploadImage = createAsyncThunk(
  'plan/setUploadImage',
  async (data, { rejectWithValue }) => {
    try {
      const formdata = new FormData();
      for (let i = 0; i < data.files.length; i++) {
        formdata.append('files', data.files[i]);
      }
      return await URL.post(`/plans/${data.planId}/images`, formdata, {
        headers: {
          Authorization: sessionStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => res.data.data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const getImage = createAsyncThunk(
  'plan/getImage',
  async (planId, { rejectWithValue }) => {
    try {
      return await URL.get(`/plans/${planId}/images`, {
        headers: {
          Authorization: sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      }).then(res => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);
export const deleteImage = createAsyncThunk(
  'plan/deleteImage',
  async (imageId, { rejectWithValue }) => {
    try {
      console.log(imageId);
      return await URL.delete(`/plans/images/${imageId}`, {
        headers: {
          Authorization: sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      }).then(res => {
        console.log(res);
      });
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
    builder
      .addCase(getPlans.fulfilled, (state, action) => {
        state.plans = action.payload;
      })
      .addCase(getOnePlan.fulfilled, (state, action) => {
        state.showplan = action.payload;
      })
      .addCase(setUploadImage.fulfilled, (state, action) => {
        console.log(state, action.payload);
        state.showplan.imageList = state.showplan.imageList.concat(
          action.payload,
        );
        state.images = action.payload;
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
export const { setOnePlan } = planSlice.actions;

export default planSlice.reducer;
