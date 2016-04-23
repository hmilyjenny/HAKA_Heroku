import { combineReducers } from 'redux';
import auth from './authReducer';
import project from './projectReducer';
import system from './systemReducer'

const rootReducer = combineReducers({
  auth,
  project,
  system
});

export default rootReducer;
