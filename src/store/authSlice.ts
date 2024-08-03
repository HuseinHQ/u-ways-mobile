import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {userBioComplete} from './userSlice';

const baseUrl = process.env.BACKEND_URL;

export const login = createAsyncThunk(
  'auth/login',
  async (
    loginData: {email: string; password: string},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: baseUrl + '/auth/login',
        headers: {'Content-Type': 'application/json'},
        data: loginData,
        timeout: 5000,
      });
      dispatch(userBioComplete(data.data.isBioComplete));
      return data.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error?.response?.data?.errors);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    props: {
      name: string;
      email: string;
      password: string;
      confirm_password: string;
      callback?: () => void;
    },
    {rejectWithValue},
  ) => {
    try {
      const {callback = () => {}, ...registerData} = props;
      const {data} = await axios({
        method: 'POST',
        url: baseUrl + '/auth/register',
        headers: {'Content-Type': 'application/json'},
        data: registerData,
        timeout: 5000,
      });

      if (data.data.forward) {
        callback();
      }
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refresh-token',
  async (
    {
      refresh_token,
      successCallback = () => {},
    }: {refresh_token: string; successCallback?: (value: any) => void},
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: baseUrl + '/auth/refresh-token',
        headers: {'X-Refresh-Token': refresh_token},
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

const initialState = {
  loading: false,
  accessToken: '',
  refreshToken: '',
  isBioComplete: true,
  role: '',
  errors: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    clearErrors: state => {
      state.errors = null;
    },
    authBioComplete: (state, action) => {
      state.isBioComplete = action.payload;
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
        state.isBioComplete = action.payload.isBioComplete;
        state.role = action.payload.role;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      })
      .addCase(register.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isBioComplete = action.payload.isBioComplete;
        state.role = action.payload.role;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
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

export const {logout, clearErrors, authBioComplete} = authSlice.actions;
export default authSlice.reducer;
