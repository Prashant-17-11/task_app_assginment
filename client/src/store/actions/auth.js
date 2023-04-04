import api from "../../utility/api";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_TASK,
  GET_ALL_USERS,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, avatar, password }) =>
  async (dispatch) => {
    avatar = avatar.toLowerCase();
    const body = JSON.stringify({ name, email, avatar, password });
    try {
      const res = await api.post("/user", body);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await api.post("/auth", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_TASK });
};

// Get all Users
export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await api.get("/user/users");
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
