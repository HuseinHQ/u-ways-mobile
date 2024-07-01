import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.BACKEND_URL;

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: {email: string; password: string}, {rejectWithValue}) => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: baseUrl + '/auth/login',
        headers: {'Content-Type': 'application/json'},
        data: loginData,
      });
      return data.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error?.response?.errors);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    accessToken: '',
    refreshToken: '',
    errors: {},
    user: {
      name: '',
      role: '',
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.errors = {};
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      });
  },
});

export default authSlice.reducer;
