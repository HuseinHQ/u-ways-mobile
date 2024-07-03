import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.BACKEND_URL;

export const getFaculties = createAsyncThunk(
  'faculties',
  async ({access_token}: {access_token: string}, {rejectWithValue}) => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: baseUrl + '/faculties',
        headers: {access_token},
        timeout: 5000,
      });
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

const facultySlice = createSlice({
  name: 'faculties',
  initialState: {
    loading: false,
    faculties: [],
    errors: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFaculties.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getFaculties.fulfilled, (state, action) => {
        state.faculties = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(getFaculties.rejected, (state, action) => {
        state.errors = action.payload as any;
      });
  },
});

export default facultySlice.reducer;
