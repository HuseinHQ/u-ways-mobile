import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.BACKEND_URL;

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: {email: string; password: string}, {rejectWithValue}) => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: baseUrl + '/auth/login',
        headers: {'Content-Type': 'application/json'},
        data: loginData,
      });
      return data.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error?.response?.data?.errors);
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refresh-token',
  async (
    {
      refresh_token,
      successCallback = () => {},
    }: {refresh_token: string; successCallback: (value: any) => void},
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: baseUrl + '/auth/refresh-token',
        headers: {refresh_token},
        timeout: 5000,
      });
      successCallback(data.data.access_token);
      return data.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error?.response?.data?.errors);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    accessToken: '',
    refreshToken: '',
    errors: null,
  },
  reducers: {
    logout: state => {
      state.accessToken = '';
      state.refreshToken = '';
      state.errors = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      })
      .addCase(refreshToken.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.loading = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
        state.accessToken = '';
        state.refreshToken = '';
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
