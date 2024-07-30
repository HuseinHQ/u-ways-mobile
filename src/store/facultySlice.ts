import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';

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

export const postFaculty = createAsyncThunk(
  'faculties/add',
  async (
    {
      access_token,
      name,
      successCB,
    }: {access_token: string; name: string; successCB: () => void},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: baseUrl + '/faculties',
        headers: {access_token},
        data: {name},
      });

      dispatch(getFaculties({access_token}));
      Toast.show({
        type: 'success',
        text1: 'Berhasil',
        text2: data.data.message,
      });

      successCB();
      return true;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.message);
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
      })
      .addCase(postFaculty.pending, state => {
        state.loading = true;
      })
      .addCase(postFaculty.fulfilled, state => {
        state.loading = false;
      })
      .addCase(postFaculty.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      });
  },
});

export const {clearErrors} = facultySlice.actions;
export default facultySlice.reducer;
