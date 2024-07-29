import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.BACKEND_URL;

export const getFaculties = createAsyncThunk(
  'faculties',
  async (
    {access_token, search}: {access_token: string; search?: string},
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/faculties${search ? `?search=${search}` : ''}`,
        headers: {access_token},
        timeout: 5000,
      });
      console.log(data.data);
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

type Faculties = {
  id: number;
  name: string;
};

const facultySlice = createSlice({
  name: 'faculties',
  initialState: {
    loading: false,
    faculties: [] as Faculties[],
    errors: null,
  },
  reducers: {
    clearErrors: state => {
      state.errors = null;
    },
  },
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

export const {clearErrors} = facultySlice.actions;
export default facultySlice.reducer;
