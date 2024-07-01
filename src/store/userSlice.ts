import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    name: '',
    role: '',
    isComplete: 'false',
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.role;
    },
  },
});
