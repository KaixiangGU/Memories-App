import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";

const authSlice = createSlice({
  name: "auth",
  initialState: { authData: null },
  reducers: {
    auth(state, action) {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    },

    logout(state, action) {
      localStorage.clear();
      return { ...state, authData: null };
    },
  },
});

export const signIn = (formData, naviagte) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch(auth(data));
    naviagte("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, naviagte) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch(auth(data));
    naviagte("/");
  } catch (error) {
    console.log(error);
  }
};

export const { auth, logout } = authSlice.actions;

export default authSlice.reducer;
