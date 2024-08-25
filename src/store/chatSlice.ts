import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from './store';

const baseUrl = process.env.BACKEND_URL;

export const getChats = createAsyncThunk(
  'chats',
  async (props: {access_token: string}, {rejectWithValue}) => {
    try {
      const {access_token} = props;
      const {data} = await axios({
        method: 'GET',
        url: baseUrl + '/chats',
        headers: {'X-Access-Token': access_token},
      });

      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const updateChatDate = createAsyncThunk(
  'chats/updateDate',
  async (
    props: {access_token: string; id: string; date: Date},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {access_token, id, date} = props;
      const chatId = id.split('-')[1];
      await axios({
        method: 'PATCH',
        url: baseUrl + '/chats/' + chatId,
        data: {date},
        headers: {
          'X-Access-Token': access_token,
          'Content-Type': 'application/json',
        },
      });

      dispatch(getChats({access_token}));
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const postImageFile = createAsyncThunk(
  'chats/postImage',
  async (props: {file: any}, {rejectWithValue, dispatch, getState}) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;
      const {access_token, id, image} = props;

      const {data} = await axios({
        method: 'POST',
        url: baseUrl + '/chats/file',
        data: {image},
        headers: {
          'X-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      });

      dispatch(getChats({access_token}));
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

const initialState = {
  data: [],
  loading: false,
  errors: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChats: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getChats.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      });
  },
});

export const {clearChats} = chatSlice.actions;
export default chatSlice.reducer;
