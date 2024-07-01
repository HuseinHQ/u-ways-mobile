import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    role: '',
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.role;
    },
  },
});
