import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.BACKEND_URL;

type Student = {
  id: number;
  name: string;
  npm: string;
};

type InitialState = {
  loading: boolean;
  data: Student[] | [];
  errors: any;
  pagination: {
    cohortList: number[];
    cohort: number | null;
  };
};

const initialState: InitialState = {
  loading: false,
  data: [],
  errors: null,
  pagination: {
    cohortList: [],
    cohort: null,
  },
};

export const getStudents = createAsyncThunk(
  'students',
  async (props: {access_token: string; cohort?: number}, {rejectWithValue}) => {
    try {
      const {access_token, cohort} = props;
      console.log(`${baseUrl}/students${cohort ? '?cohort=' + cohort : ''}`);
      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/students${cohort ? '?cohort=' + cohort : ''}`,
        headers: {access_token},
      });

      return data;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getStudents.pending, state => {
        state.loading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.errors = null;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      });
  },
});

export default studentSlice.reducer;
