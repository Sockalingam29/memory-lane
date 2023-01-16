import { AUTH } from "../constants/actionTypes";
import { toast } from 'react-toastify'

import * as api from "../api/index.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate("/")
  } catch (error) {
    console.log(error);

    const errorMessage = error.response.data.message
    const errorDisplay = errorMessage ? errorMessage : error

    toast("Can't sign-in! " + errorDisplay, {
      type: "error",
      position: "top-center",
      autoClose: 2000,
      theme: "dark"
    });
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);

    const errorMessage = error.response.data.message
    const errorDisplay = errorMessage ? errorMessage : error

    toast("Can't sign-up " + errorDisplay, {
      type: "error",
      position: "top-center",
      autoClose: 2000,
      theme: "dark"
    });
  }
};
