import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.BACKEND_URL;

export const getAllLecturers = createAsyncThunk(
  'lecturers',
  async (
    {
      access_token,
      FacultyId,
      search,
    }: {access_token: string; FacultyId?: string; search?: string},
    {rejectWithValue},
  ) => {
    try {
      const params = new URLSearchParams();
      if (FacultyId) {
        params.append('FacultyId', FacultyId);
      }
      if (search) {
        params.append('search', search);
      }

      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/lecturers?${params.toString()}`,
        headers: {access_token},
      });
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response.data.errors);
    }
  },
);

type Lecturer = {
  id: number;
  name: string;
};

const lecturerSlice = createSlice({
  name: 'lecturer',
  initialState: {
    loading: false,
    lecturers: [] as Lecturer[],
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
