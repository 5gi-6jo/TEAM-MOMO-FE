import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tokenURL, URL } from '../../shared/apis/API';
import { MOCK } from '../../shared/apis/plans';

const ismock = false;
export const getPlans = createAsyncThunk(
  'plan/getPlans',
  async (data, { rejectWithValue }) => {
    try {
      if (ismock) return MOCK.Plans.data;

      // console.log(sessionStorage.getItem('token').split('Bearer ')[1]);
      return await tokenURL.get(`/plans?date=${data.date}`).then(response => {
        console.log(response);
        return response.data.data;
      });
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
      return await tokenURL.get(`/plans/${planId}`).then(response => {
        const data = {
          ...response.data.data,
          planId: planId,
        };
        return data;
      });
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
      return await tokenURL.post('/plans', data).then(res => {
        return res.data;
      });
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);
export const editPlans = createAsyncThunk(
  'plan/editPlans',
  async (data, { rejectWithValue }) => {
    try {
      return await tokenURL.put(`/plans/${data.id}`, data).then(res => {
        console.log(res);
        // setOnePlan(data);
      });
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message);

      return rejectWithValue(error.response.data);
    }
  },
);
export const deletePlans = createAsyncThunk(
  'plan/deletePlans',
  async (data, { rejectWithValue }) => {
    try {
      return await tokenURL.delete(`/plans/${data.id}`).then(res => {
        return data.id;
      });
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message);

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
      return await tokenURL
        .post(`/plans/${data.planId}/images`, formdata)
        .then(res => res.data.data);
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message);

      return rejectWithValue(error.response.data);
    }
  },
);

export const getImage = createAsyncThunk(
  'plan/getImage',
  async (planId, { rejectWithValue }) => {
    try {
      return await tokenURL.get(`/plans/${planId}/images`).then(res => {
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
      return await tokenURL.delete(`/images/${imageId}`).then(res => {
        console.log(res);
        return imageId;
      });
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message);

      return rejectWithValue(error.response.data);
    }
  },
);

export const setFCMTokenplan = createAsyncThunk(
  'plan/setFCMTokenplan',
  async (data, { rejectWithValue }) => {
    const newdata = {
      ...data,
      planId: 20,
    };
    try {
      return await tokenURL
        .post(`/api/fcm`, newdata)
        .then(response => response.data.data);
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
      .addCase(deletePlans.fulfilled, (state, action) => {
        state.showplan = null;
        // console.log(state.plans[1].planId);
        console.log(action.payload);
        console.log(state.plans.filter(e => e.planId !== action.payload));
        state.plans = state.plans.filter(e => e.planId !== action.payload);
      })
      .addCase(setUploadImage.fulfilled, (state, action) => {
        console.log(state, action.payload);

        state.showplan.imageList = state.showplan.imageList.concat(
          action.payload,
        );
        state.images = action.payload;
      })

      .addCase(deleteImage.fulfilled, (state, action) => {
        state.showplan.imageList = state.showplan.imageList.filter(
          e => e.imageId !== action.payload,
        );
      })
      .addCase(setFCMTokenplan.fulfilled, (state, action) => {});

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
