import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

export const login = (payload) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    let res = await axios.post(`http://localhost:3001/api/login`, payload);
    console.log(res.data);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error.response.data, "hello");
    dispatch({ type: LOGIN_FAILURE, payload: error?.response?.data.error });
  }
};

export const register = (payload) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    let res = await axios.post(`http://localhost:3001/api/register`, payload);
    console.log(res.data);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data?.status });
  } catch (error) {
    console.log(error?.response?.data?.error);
    dispatch({ type: REGISTER_FAILURE, payload: error?.response?.data?.error });
  }
};
