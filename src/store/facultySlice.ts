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
        headers: {'X-Access-Token': access_token},
        timeout: 5000,
      });

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
        headers: {'X-Access-Token': access_token},
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
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const bulkDeleteFaculties = createAsyncThunk(
  'faculties/bulkdDelte',
  async (
    {
      access_token,
      value,
      callback = () => {},
    }: {
      access_token: string;
      value: number[];
      callback?: () => void;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'DELETE',
        url: baseUrl + '/faculties',
        headers: {'X-Access-Token': access_token},
        data: value,
        timeout: 5000,
      });

      dispatch(getFaculties({access_token}));
      Toast.show({
        text1: 'Berhasil',
        text2: data.data.message,
      });
      callback();
      return true;
    } catch (err) {
      callback();
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const editFaculty = createAsyncThunk(
  'faculties/edit',
  async (
    {
      access_token,
      id: identifier,
      name,
      successCB = () => {},
    }: {
      access_token: string;
      id: number;
      name: string;
      successCB?: () => void;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'PUT',
        url: baseUrl + '/faculties/' + identifier,
        headers: {'X-Access-Token': access_token},
        data: {name},
      });

      dispatch(getFaculties({access_token}));
      Toast.show({
        text1: 'Berhasil',
        text2: data.data.message,
      });

      successCB();
      return true;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const deleteFaculty = createAsyncThunk(
  'faculties/delete',
  async (
    {
      access_token,
      id: identifier,
      successCB = () => {},
    }: {access_token: string; id: number; successCB?: () => void},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'DELETE',
        url: baseUrl + '/faculties/' + identifier,
        headers: {'X-Access-Token': access_token},
        timeout: 5000,
      });

      dispatch(getFaculties({access_token}));
      successCB();
      Toast.show({text1: 'Berhasil', text2: data.data.message});
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
      })
      .addCase(bulkDeleteFaculties.pending, state => {
        state.loading = true;
      })
      .addCase(bulkDeleteFaculties.fulfilled, state => {
        state.loading = false;
      })
      .addCase(bulkDeleteFaculties.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      })
      .addCase(editFaculty.pending, state => {
        state.loading = true;
      })
      .addCase(editFaculty.fulfilled, state => {
        state.loading = false;
      })
      .addCase(editFaculty.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      })
      .addCase(deleteFaculty.pending, state => {
        state.loading = true;
      })
      .addCase(deleteFaculty.fulfilled, state => {
        state.loading = false;
      })
      .addCase(deleteFaculty.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      });
  },
});

export const {clearErrors} = facultySlice.actions;
export default facultySlice.reducer;
