import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from '@/helpers/builderHandler';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const baseUrl = process.env.BACKEND_URL;

type Student = {
  id: number;
  name: string;
  npm?: string;
  email?: string;
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

export const getAllStudents = createAsyncThunk(
  'students/all',
  async (props: {access_token: string; search?: string}, {rejectWithValue}) => {
    try {
      const {access_token, search} = props;
      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/students/all${search ? '?search=' + search : ''}`,
        headers: {access_token},
      });

      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const deleteStudent = createAsyncThunk(
  'students/delete',
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
        url: baseUrl + '/students/' + id,
        headers: {access_token},
        timeout: 5000,
      });

      dispatch(getAllStudents({access_token}));
      callback();
      Toast.show({text1: 'Berhasil', text2: data.data.message});
      return true;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const bulkDeleteStudents = createAsyncThunk(
  'students/bulkDelete',
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
        url: baseUrl + '/students',
        data: ids,
        headers: {access_token},
        timeout: 5000,
      });

      dispatch(getAllStudents({access_token}));
      Toast.show({text1: 'Berhasil', text2: data.data.message});
      callback();
      return true;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const editStudent = createAsyncThunk(
  'students/edit',
  async (
    {
      access_token,
      id,
      studentData,
      callback = () => {},
    }: {
      access_token: string;
      id: number;
      studentData: {
        name: string;
        email: string;
        MajorId: number;
        LecturerId: number;
        semester: number;
        npm: string;
        cohort: number;
      };
      callback: () => void;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'PUT',
        url: baseUrl + '/students/' + id,
        data: studentData,
        headers: {access_token},
        timeout: 5000,
      });

      dispatch(getAllStudents({access_token}));
      callback();
      Toast.show({text1: 'Berhasil', text2: data.data.message});
      return true;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
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
      .addCase(getStudents.pending, handlePending)
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.errors = null;
      })
      .addCase(getStudents.rejected, handleRejected)
      .addCase(getAllStudents.pending, handlePending)
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errors = null;
      })
      .addCase(getAllStudents.rejected, handleRejected)
      .addCase(deleteStudent.pending, handlePending)
      .addCase(deleteStudent.fulfilled, handleFulfilled)
      .addCase(deleteStudent.rejected, handleRejected)
      .addCase(bulkDeleteStudents.pending, handlePending)
      .addCase(bulkDeleteStudents.fulfilled, handleFulfilled)
      .addCase(bulkDeleteStudents.rejected, handleRejected)
      .addCase(editStudent.pending, handlePending)
      .addCase(editStudent.fulfilled, handleFulfilled)
      .addCase(editStudent.rejected, handleRejected);
  },
});

export const {clearErrors, setErrors} = studentSlice.actions;
export default studentSlice.reducer;
