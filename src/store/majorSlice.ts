import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.BACKEND_URL;

export const getMajors = createAsyncThunk(
  'majors',
  async (
    props: {access_token: string; FacultyId?: number},
    {rejectWithValue},
  ) => {
    const {access_token, FacultyId} = props;
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/majors${FacultyId ? '?FacultyId=' + FacultyId : ''}`,
        headers: {access_token},
        timeout: 5000,
      });
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

type Majors = {
  id: number;
  FacultyId: number;
  name: string;
};

const majorSlice = createSlice({
  name: 'majors',
  initialState: {
    loading: false,
    majors: [] as Majors[],
    errors: null,
  },
  reducers: {
    clearErrors: state => {
      state.errors = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMajors.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getMajors.fulfilled, (state, action) => {
        state.majors = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(getMajors.rejected, (state, action) => {
        state.errors = action.payload as any;
      });
  },
});

export const {clearErrors} = majorSlice.actions;
export default majorSlice.reducer;
