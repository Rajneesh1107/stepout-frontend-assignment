import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./ActionType";

export const initState = {
  token: "",
  isAuth: false,
  isLoading: false,
  isError: false,
  msg: "",
};
export const AuthReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        token: payload?.access_token,
        msg: payload?.msg,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: payload,
        isAuth: false,
      };
    default:
      return state;
  }
};
