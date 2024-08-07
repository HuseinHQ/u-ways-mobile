import {createSlice} from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    data: [],
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: {},
});
