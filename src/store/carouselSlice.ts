import {Carousel} from '@/types/carousel';
import {createSlice} from '@reduxjs/toolkit';
import {getAllCarousels} from './carouselActions';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from '@/helpers/builderHandler';

const initialState = {
  data: <Carousel[]>[],
  loading: false,
  errors: null,
};

const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    clearErrors: state => {
      state.errors = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllCarousels.pending, handlePending);
    builder.addCase(getAllCarousels.fulfilled, handleFulfilled);
    builder.addCase(getAllCarousels.rejected, handleRejected);
  },
});

export const {clearErrors} = carouselSlice.actions;
export default carouselSlice.reducer;
