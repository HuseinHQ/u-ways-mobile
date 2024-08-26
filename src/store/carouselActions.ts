import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from './store';

const baseUrl = process.env.BACKEND_URL + '/carousels';

export const getAllCarousels = createAsyncThunk(
  'carousel/getAllCarousels',
  async (_, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const {accessToken} = state.auth;

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
