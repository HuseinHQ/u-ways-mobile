import {createSlice} from '@reduxjs/toolkit';
import {getAllQuizResluts} from './quizResultActions';
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
    builder.addCase(getAllQuizResluts.fulfilled, handleFulfilled);
    builder.addCase(getAllQuizResluts.rejected, handleRejected);
  },
});

export const {clearErrors} = quizResultSlice.actions;
export default quizResultSlice.reducer;
