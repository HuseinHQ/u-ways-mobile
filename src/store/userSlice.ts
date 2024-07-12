import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {authBioComplete} from './authSlice';

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
        timeout: 5000,
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

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (
    updateData: {access_token: string; data: any; cb?: (value?: any) => void},
    {rejectWithValue, dispatch},
  ) => {
    const {access_token, data, cb = () => {}} = updateData;
    try {
      const {data: response} = await axios({
        method: 'PUT',
        url: `${baseUrl}/user`,
        headers: {access_token},
        data,
        timeout: 5000,
      });
      dispatch(getUserProfile({access_token}));
      cb(response.data.message);
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const completeBiodata = createAsyncThunk(
  'user/completeBiodata',
  async (
    props: {
      access_token: string;
      successCB?: () => void;
      MajorId: number;
      LecturerId?: number;
      semester?: number;
      nip?: string;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {access_token, successCB = () => {}, ...formData} = props;
      console.log(formData);
      const {data} = await axios({
        method: 'POST',
        url: baseUrl + '/user/complete-data',
        data: formData,
        headers: {access_token, 'Content-Type': 'application/json'},
        timeout: 5000,
      });
      dispatch(authBioComplete(true));
      await new Promise(resolve => setTimeout(resolve, 5000));
      dispatch(getUserProfile({access_token, cb: successCB}));
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

const initialState = {
  email: '',
  name: '',
  role: '',
  is_bio_complete: true,
  major_id: 0,
  major_name: '',
  faculty_id: 0,
  faculty_name: '',
  semester: 0,
  lecturer_id: 0,
  lecturer_name: '',
  loading: false,
  errors: null,
  nip: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: state => {
      state.errors = null;
    },
    userBioComplete: (state, action) => {
      state.is_bio_complete = action.payload;
    },
    resetUser: () => initialState,
  },
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
      })
      .addCase(updateUserProfile.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(updateUserProfile.fulfilled, state => {
        state.loading = false;
        state.errors = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      })
      .addCase(completeBiodata.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(completeBiodata.fulfilled, state => {
        state.loading = false;
        state.errors = null;
      })
      .addCase(completeBiodata.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      });
  },
});

export const {clearErrors, userBioComplete, resetUser} = userSlice.actions;
export default userSlice.reducer;
