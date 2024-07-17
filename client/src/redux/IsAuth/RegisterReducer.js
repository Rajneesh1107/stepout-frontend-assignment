import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

export const initState = {
  isLoading: false,
  isError: false,
  isRegister: false,
  msg: "",
};
export const RegisterReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return { ...state, isLoading: true };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isRegister: true,
        msg: payload,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: payload,
        isRegister: false,
      };
    default:
      return state;
  }
};
