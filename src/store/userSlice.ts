import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.BACKEND_URL;

export const getUserProfile = createAsyncThunk(
  'user',
  async function (
    {
      access_token,
      cb = () => {},
    }: {access_token: string; cb?: (value?: any) => void},
    {rejectWithValue},
  ) {
    try {
      const {data} = await axios({
        method: 'GET',
        url: baseUrl + '/user',
        headers: {access_token},
      });
      const params = {is_bio_complete: data.data.is_bio_complete};
      cb(params);
      return data.data;
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err?.response?.data?.errors);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    name: '',
    role: '',
    is_bio_complete: false,
    major_id: 0,
    major_name: '',
    faculty_id: 0,
    faculty_name: '',
    semester: 0,
    lecturer_id: 0,
    lecturer_name: '',
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserProfile.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          ...action.payload,
        };
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      });
  },
});

export default userSlice.reducer;
