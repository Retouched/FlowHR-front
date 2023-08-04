import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    lastname: null,
    email: null,
    role: null,
    connected: false,
    firstname: null,
    job: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.lastname = action.payload.lastname;
      state.value.email = action.payload.email;
      state.value.role = action.payload.role;
      state.value.firstname = action.payload.firstname;
      state.value.job = action.payload.job;
      state.value.connected = true;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.lastname = null;
      state.value.email = null;
      state.value.role = null;
      state.value.firstname = null;
      state.value.job = null;
      state.value.connected = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
