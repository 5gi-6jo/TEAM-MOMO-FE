import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  image_url: [
    'https://team6-bucket.s3.ap-northeast-2.amazonaws.com/57bb56e3-3a31-4451-9303-e062ad7dbdd0.jpg',
    'https://team6-bucket.s3.ap-northeast-2.amazonaws.com/57bb56e3-3a31-4451-9303-e062ad7dbdd0.jpg',
  ],
  preview: null,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setPreview: (state, action) => {
      state.preview = action.payload;
    },
  },
});

export const { setPreview } = imageSlice.actions;

export default imageSlice.reducer;
