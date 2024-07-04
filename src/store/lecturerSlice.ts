import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.BACKEND_URL;

export const getAllLecturers = createAsyncThunk(
  'lecturers',
  async (
    {access_token, FacultyId}: {access_token: string; FacultyId?: string},
    {rejectWithValue},
  ) => {
    try {
      console.log(
        `FETCH: ${baseUrl}/lecturers?${
          FacultyId ? 'FacultyId=' + FacultyId : ''
        }`,
      );
      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/lecturers?${
          FacultyId ? 'FacultyId=' + FacultyId : ''
        }`,
        headers: {access_token},
      });
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response.data.errors);
    }
  },
);

const lecturerSlice = createSlice({
  name: 'lecturer',
  initialState: {
    loading: false,
    lecturers: [],
    errors: null,
  },
  reducers: {
    clearErrors: state => {
      state.errors = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllLecturers.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getAllLecturers.fulfilled, (state, action) => {
        state.lecturers = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(getAllLecturers.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      });
  },
});

export const {clearErrors} = lecturerSlice.actions;
export default lecturerSlice.reducer;
