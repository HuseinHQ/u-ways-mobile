import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'Auth',
  initialState: {
    accessToken: '',
    refreshToken: '',
    user: {
      name: '',
      role: '',
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setUser: (state, action) => {
      state.user.name = action.payload.name;
      state.user.role = action.payload.role;
    },
  },
});

export const {setToken, setUser} = authSlice.actions;
export default authSlice.reducer;
