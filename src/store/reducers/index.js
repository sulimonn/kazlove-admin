import { combineReducers } from 'redux';

import auth from './auth';
import menu from './menu';
import action from './action';
import catalog from './catalog';
import { apiSlice } from './apiSlice';

const reducers = combineReducers({
  action,
  catalog,
  menu,
  [auth.reducerPath]: auth.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default reducers;
