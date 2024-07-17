import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { AuthReducer } from "./IsAuth/AuthReducer";
import { RegisterReducer } from "./IsAuth/RegisterReducer";
import { TrainReducer } from "./TicketBook/TickectReducer";

const rootReducer = combineReducers({
  AuthReducer,
  RegisterReducer,
  TrainReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
