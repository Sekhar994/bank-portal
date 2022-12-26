import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import JWTReducer from "./Reducer/AuthenticationReducer";

const store = createStore(JWTReducer,applyMiddleware(thunk));

export default store;