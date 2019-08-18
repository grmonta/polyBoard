import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import stock from './stock';

export default combineReducers({
  alert,
  auth,
  profile,
  stock
});
