import {combineReducers} from 'redux';
import auth from './authReducer';
import project from './projectReducer';
import system from './systemReducer';
import channels from './channelsReducer';

const rootReducer = combineReducers({
    auth,
    project,
    system,
    channels
});

export default rootReducer;
