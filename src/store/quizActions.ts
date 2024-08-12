import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from './store';
import axios from 'axios';
import {QuizRequest} from '@/types/quiz';
import Toast from 'react-native-toast-message';
import {clearQuizDetail} from './quizSlice';

const baseUrl = process.env.BACKEND_URL + '/quizzes';

export const getAllQuizzes = createAsyncThunk(
  'quiz/getAllQuizzes',
  async ({search}: {search?: string}, {getState, rejectWithValue}) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    try {
      const {data} = await axios({
        method: 'GET',
        url: baseUrl + (search ? `?search=${search}` : ''),
        headers: {'X-Access-Token': accessToken},
        timeout: 5000,
      });

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const getQuizDetail = createAsyncThunk(
  'quiz/getQuizDetail',
  async ({id}: {id: number}, {getState, rejectWithValue, dispatch}) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    try {
      dispatch(clearQuizDetail());

      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/${id}`,
        headers: {'X-Access-Token': accessToken},
        timeout: 5000,
      });

      return data.data;
    } catch (error: any) {
      console.log(error.response.data.errors);
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const createQuiz = createAsyncThunk(
  'quiz/createQuiz',
  async (requestBody: QuizRequest, {getState, rejectWithValue, dispatch}) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    try {
      const {data} = await axios({
        method: 'POST',
        url: baseUrl,
        headers: {'X-Access-Token': accessToken},
        data: requestBody,
        timeout: 5000,
      });

      dispatch(getAllQuizzes({}));
      Toast.show({
        type: 'success',
        text1: 'Berhasil',
        text2: data.data.message,
      });

      return true;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const bulkDeleteQuizzes = createAsyncThunk(
  'quiz/bulkDeleteQuizzes',
  async (
    {value, callback = () => {}}: {value: number[]; callback: () => void},
    {getState, rejectWithValue, dispatch},
  ) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    try {
      const {data} = await axios({
        method: 'DELETE',
        url: baseUrl,
        headers: {'X-Access-Token': accessToken},
        data: value,
        timeout: 5000,
      });

      dispatch(getAllQuizzes({}));
      Toast.show({
        type: 'success',
        text1: 'Berhasil',
        text2: data.data.message,
      });
      callback();

      return true;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const deleteQuiz = createAsyncThunk(
  'quiz/deleteQuiz',
  async (
    {id, callback = () => {}}: {id: number; callback?: () => void},
    {getState, rejectWithValue, dispatch},
  ) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    try {
      const {data} = await axios({
        method: 'DELETE',
        url: `${baseUrl}/${id}`,
        headers: {'X-Access-Token': accessToken},
        timeout: 5000,
      });

      dispatch(getAllQuizzes({}));
      Toast.show({
        type: 'success',
        text1: 'Berhasil',
        text2: data.data.message,
      });
      callback();

      return true;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const editQuiz = createAsyncThunk(
  'quiz/editQuiz',
  async (
    {
      id,
      requestBody,
      callback = () => {},
    }: {id: number; requestBody: QuizRequest; callback?: () => void},
    {getState, rejectWithValue, dispatch},
  ) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    try {
      const {data} = await axios({
        method: 'PUT',
        url: `${baseUrl}/${id}`,
        headers: {'X-Access-Token': accessToken},
        data: requestBody,
        timeout: 5000,
      });

      dispatch(getAllQuizzes({}));
      Toast.show({
        type: 'success',
        text1: 'Berhasil',
        text2: data.data.message,
      });
      callback();

      return true;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const getStudentQuiz = createAsyncThunk(
  'quiz/getStudentQuiz',
  async (_, {getState, rejectWithValue}) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    try {
      const {data} = await axios({
        method: 'GET',
        url: baseUrl + '/student',
        headers: {'X-Access-Token': accessToken},
        timeout: 5000,
      });

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);
