import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from './store';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {QuizResult, QuizResultReq} from '@/types/quizResult';

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

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const createQuizResult = createAsyncThunk(
  'quizResult/createQuizResult',
  async (
    {
      data,
      callback = () => {},
    }: {
      data: QuizResultReq;
      callback?: (id: number) => void;
    },
    {getState, rejectWithValue, dispatch},
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

      dispatch(getAllQuizResluts());
      Toast.show({
        text1: 'Berhasil',
        text2: response.data.data.message,
      });
      callback(response?.data?.data?.newQuizId);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const getQuizResult = createAsyncThunk(
  'quizResult/getQuizResult',
  async (
    {
      id,
      callback = () => {},
    }: {id: number; callback: (value: QuizResult) => void},
    {getState, rejectWithValue},
  ) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    try {
      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/${id}`,
        headers: {'X-Access-Token': accessToken},
        timeout: 5000,
      });

      callback(data.data);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);
