import {createSlice} from '@reduxjs/toolkit';
import {
  bulkDeleteQuizzes,
  createQuiz,
  deleteQuiz,
  editQuiz,
  getAllQuizzes,
  getQuizDetail,
  getStudentQuiz,
} from './quizActions';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from '@/helpers/builderHandler';
import {Quiz} from '@/types/quiz';

const initialState = {
  data: [] as Quiz[],
  loading: false,
  errors: null,
  detail: {
    id: 0,
    title: '',
    details: [],
    semester: 0,
    part: 0,
    startTime: undefined,
    endTime: undefined,
    createdAt: '',
    updatedAt: '',
  },
  studentQuiz: {} as Quiz,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    clearErrors: state => {
      state.errors = null;
    },
    clearQuizDetail: state => {
      state.detail = initialState.detail;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllQuizzes.pending, handlePending);
    builder.addCase(getAllQuizzes.fulfilled, (state, action) => {
      handleFulfilled(state);
      state.data = action.payload;
    });
    builder.addCase(getAllQuizzes.rejected, handleRejected);
    builder.addCase(getQuizDetail.pending, handlePending);
    builder.addCase(getQuizDetail.fulfilled, (state, action) => {
      handleFulfilled(state);
      state.detail = action.payload;
    });
    builder.addCase(getQuizDetail.rejected, handleRejected);
    builder.addCase(createQuiz.pending, handlePending);
    builder.addCase(createQuiz.fulfilled, handleFulfilled);
    builder.addCase(createQuiz.rejected, handleRejected);
    builder.addCase(bulkDeleteQuizzes.pending, handlePending);
    builder.addCase(bulkDeleteQuizzes.fulfilled, handleFulfilled);
    builder.addCase(bulkDeleteQuizzes.rejected, handleRejected);
    builder.addCase(deleteQuiz.pending, handlePending);
    builder.addCase(deleteQuiz.fulfilled, handleFulfilled);
    builder.addCase(deleteQuiz.rejected, handleRejected);
    builder.addCase(editQuiz.pending, handlePending);
    builder.addCase(editQuiz.fulfilled, handleFulfilled);
    builder.addCase(editQuiz.rejected, handleRejected);
    builder.addCase(getStudentQuiz.pending, handlePending);
    builder.addCase(getStudentQuiz.fulfilled, (state, action) => {
      handleFulfilled(state);
      state.studentQuiz = action.payload;
    });
    builder.addCase(getStudentQuiz.rejected, handleRejected);
  },
});

export const {clearErrors, clearQuizDetail} = quizSlice.actions;
export default quizSlice.reducer;
