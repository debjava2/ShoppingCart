import { createStore,applyMiddleware } from "redux";
//import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunkMiddleWare from 'redux-thunk'

import reducers from "./reducers/index";

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleWare)
);

export default store;
