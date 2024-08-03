import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from '@/helpers/builderHandler';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';

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
        headers: {'X-Access-Token': access_token},
      });
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response.data.errors);
    }
  },
);

export const deleteLecturer = createAsyncThunk(
  'lecturers/delete',
  async (
    {
      access_token,
      id,
      callback = () => {},
    }: {access_token: string; id: number; callback: () => void},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'DELETE',
        url: baseUrl + '/lecturers/' + id,
        headers: {'X-Access-Token': access_token},
        timeout: 5000,
      });

      dispatch(getAllLecturers({access_token}));
      callback();
      Toast.show({text1: 'Berhasil', text2: data.data.message});
      return true;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const bulkDeleteLecturers = createAsyncThunk(
  'lecturers/bulkDelete',
  async (
    {
      access_token,
      ids,
      callback = () => {},
    }: {access_token: string; ids: number[]; callback?: () => void},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'DELETE',
        url: baseUrl + '/lecturers',
        data: ids,
        headers: {'X-Access-Token': access_token},
        timeout: 5000,
      });

      dispatch(getAllLecturers({access_token}));
      Toast.show({text1: 'Berhasil', text2: data.data.message});
      callback();
      return true;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const editLecturer = createAsyncThunk(
  'lecturers/edit',
  async (
    {
      access_token,
      id,
      lecturerData,
      callback = () => {},
    }: {
      access_token: string;
      id: number;
      lecturerData: {name: string; email: string; nip: string; MajorId: number};
      callback: () => void;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'PUT',
        url: baseUrl + '/lecturers/' + id,
        data: lecturerData,
        headers: {'X-Access-Token': access_token},
        timeout: 5000,
      });

      dispatch(getAllLecturers({access_token}));
      callback();
      Toast.show({text1: 'Berhasil', text2: data.data.message});
      return true;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
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
    setErrors: (state, action) => {
      state.errors = action.payload;
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
      .addCase(getAllLecturers.rejected, handleRejected)
      .addCase(deleteLecturer.pending, handlePending)
      .addCase(deleteLecturer.fulfilled, handleFulfilled)
      .addCase(deleteLecturer.rejected, handleRejected)
      .addCase(bulkDeleteLecturers.pending, handlePending)
      .addCase(bulkDeleteLecturers.fulfilled, handleFulfilled)
      .addCase(bulkDeleteLecturers.rejected, handleRejected)
      .addCase(editLecturer.pending, handlePending)
      .addCase(editLecturer.fulfilled, handleFulfilled)
      .addCase(editLecturer.rejected, handleRejected);
  },
});

export const {clearErrors, setErrors} = lecturerSlice.actions;
export default lecturerSlice.reducer;
