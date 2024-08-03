import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.BACKEND_URL;

type Errors = {
  [key: string]: any;
};

type initialState = {
  lecturerCount: number;
  studentCount: number;
  loading: boolean;
  errors: Errors | null;
};

const initialState: initialState = {
  lecturerCount: 0,
  studentCount: 0,
  loading: false,
  errors: null,
};

export const getDashboardData = createAsyncThunk(
  'dashboard-data',
  async ({access_token}: {access_token: string}, {rejectWithValue}) => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/admin/dashboard`,
        headers: {'X-Access-Token': access_token},
      });
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response.data.errors);
    }
  },
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDashboardData.pending, state => {
        state.loading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        const {lecturerCount, studentCount} = action.payload;
        state.lecturerCount = lecturerCount;
        state.studentCount = studentCount;
        state.errors = null;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as Errors;
      });
  },
});

export default adminSlice.reducer;
