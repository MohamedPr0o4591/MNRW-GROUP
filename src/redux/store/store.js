import { applyMiddleware, createStore } from "redux";
import { rootReducers } from "../reducer/root";
import { thunk } from "redux-thunk";

export const store = createStore(rootReducers, applyMiddleware(thunk));
