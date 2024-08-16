import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from './store';
import axios from 'axios';

const baseUrl = process.env.BACKEND_URL + '/quiz-results';

export const getAllQuizResluts = createAsyncThunk(
  'quizResult/getAllQuizResults',
  async (_, {getState, rejectWithValue}) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    try {
      const {data} = await axios({
        method: 'GET',
        url: baseUrl,
        headers: {'X-Access-Token': accessToken},
        timeout: 5000,
      });

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const createQuizResult = createAsyncThunk(
  'quizResult/createQuizResult',
  async (
    data: {quizId: number; score: number},
    {getState, rejectWithValue},
  ) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    try {
      const response = await axios({
        method: 'POST',
        url: baseUrl,
        headers: {'X-Access-Token': accessToken},
        data,
        timeout: 5000,
      });

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);
