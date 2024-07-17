import { TICKET_FAILURE, TICKET_REQUEST, TICKET_SUCCESS } from "./ActionType";

export const intialState = {
  isLoading: false,
  isError: false,
  trains: [],
  msg: "",
};
export const TrainReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case TICKET_REQUEST:
      return { ...state, isLoading: true };

    case TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trains: payload.trains,
        msg: payload.msg,
      };

    case TICKET_FAILURE:
      return { ...state, isLoading: false, isError: true, msg: payload.error };
    default:
      return state;
  }
};
