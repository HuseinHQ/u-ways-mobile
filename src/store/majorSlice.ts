import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const baseUrl = process.env.BACKEND_URL;

export const getMajors = createAsyncThunk(
  'majors',
  async (
    props: {access_token: string; FacultyId?: number; search?: string},
    {rejectWithValue},
  ) => {
    const {access_token, FacultyId, search} = props;
    try {
      const params = new URLSearchParams();
      if (FacultyId) {
        params.append('FacultyId', FacultyId.toString());
      }
      if (search) {
        params.append('search', search);
      }

      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/majors?${params.toString()}`,
        headers: {'X-Access-Token': access_token},
        timeout: 5000,
      });
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const postMajor = createAsyncThunk(
  'majors/add',
  async (
    {
      access_token,
      name,
      successCB,
      FacultyId,
    }: {
      access_token: string;
      name: string;
      FacultyId: number;
      successCB: () => void;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: baseUrl + '/majors',
        headers: {'X-Access-Token': access_token},
        data: {name, FacultyId},
      });

      dispatch(getMajors({access_token}));
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

export const bulkDeleteMajors = createAsyncThunk(
  'majors/bulkdDelte',
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
        url: baseUrl + '/majors',
        headers: {'X-Access-Token': access_token},
        data: value,
        timeout: 5000,
      });

      dispatch(getMajors({access_token}));
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

export const editMajor = createAsyncThunk(
  'majors/edit',
  async (
    {
      access_token,
      id: identifier,
      name,
      FacultyId,
      successCB = () => {},
    }: {
      access_token: string;
      id: number;
      name: string;
      FacultyId: number;
      successCB?: () => void;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'PUT',
        url: baseUrl + '/majors/' + identifier,
        headers: {'X-Access-Token': access_token},
        data: {name, FacultyId},
      });

      dispatch(getMajors({access_token}));
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

export const deleteMajor = createAsyncThunk(
  'majors/delete',
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
        url: baseUrl + '/majors/' + identifier,
        headers: {'X-Access-Token': access_token},
        timeout: 5000,
      });

      dispatch(getMajors({access_token}));
      successCB();
      Toast.show({text1: 'Berhasil', text2: data.data.message});
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
        state.loading = false;
        state.errors = action.payload as any;
      })
      .addCase(postMajor.pending, state => {
        state.loading = true;
      })
      .addCase(postMajor.fulfilled, state => {
        state.loading = false;
      })
      .addCase(postMajor.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      })
      .addCase(bulkDeleteMajors.pending, state => {
        state.loading = true;
      })
      .addCase(bulkDeleteMajors.fulfilled, state => {
        state.loading = false;
      })
      .addCase(bulkDeleteMajors.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      })
      .addCase(editMajor.pending, state => {
        state.loading = true;
      })
      .addCase(editMajor.fulfilled, state => {
        state.loading = false;
      })
      .addCase(editMajor.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      })
      .addCase(deleteMajor.pending, state => {
        state.loading = true;
      })
      .addCase(deleteMajor.fulfilled, state => {
        state.loading = false;
      })
      .addCase(deleteMajor.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      });
  },
});

export const {clearErrors} = majorSlice.actions;
export default majorSlice.reducer;
