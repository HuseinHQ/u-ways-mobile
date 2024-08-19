import {createSlice} from '@reduxjs/toolkit';
import {createQuizResult, getAllQuizResluts} from './quizResultActions';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from '@/helpers/builderHandler';
import {QuizResult} from '@/types/quizResult';

const initialState = {
  data: <QuizResult[]>[],
  loading: false,
  errors: null,
  summary: {
    scoreAverage: 0,
  },
};

const quizResultSlice = createSlice({
  name: 'quizResult',
  initialState,
  reducers: {
    clearErrors: state => {
      state.errors = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllQuizResluts.pending, handlePending);
    builder.addCase(getAllQuizResluts.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = null;
      state.data = action.payload.data;
      state.summary = action.payload.summary;
    });
    builder.addCase(getAllQuizResluts.rejected, handleRejected);
    builder.addCase(createQuizResult.pending, handlePending);
    builder.addCase(createQuizResult.fulfilled, handleFulfilled);
    builder.addCase(createQuizResult.rejected, handleRejected);
  },
});

export const {clearErrors} = quizResultSlice.actions;
export default quizResultSlice.reducer;
