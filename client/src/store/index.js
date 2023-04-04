import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import auth from "./reducers/auth";
import task from "./reducers/task";

const reducer = combineReducers({ auth, task });
const initialState = {};
// const middleware = [thunk]

const store = configureStore({ reducer, initialState });

export default store;
