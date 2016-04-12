import jwtDecode from 'jwt-decode';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER,LOGIN_USER_EXPIRE,REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE } from '../constants/authConstants';
  
const initialState = {
    token: null,
    userName: null,
    isRegistering:false,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    role:null,
    expire:false
};

const authReducer = (state = initialState,action) =>{
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
      break;
    case REGISTER_USER_REQUEST:
      return Object.assign({}, state, {
          'isRegistering': true,
          'statusText': null
      });
      break;
    case REGISTER_USER_SUCCESS:
      return Object.assign({},state,{
        'isRegistering': false,
        'statusText':'已经成功注册,请登录'
      });
      break;
    case REGISTER_USER_FAILURE:
      return Object.assign({}, state, {
          'isRegistering': false,
          'statusText': action.payload.statusText
      });
      break;
    case LOGIN_USER_SUCCESS:
      return Object.assign({},state,{
        'isAuthenticating':false,
        'isAuthenticated': true,
        'token':action.payload.token,
        'userName': jwtDecode(action.payload.token).username,
        'role':jwtDecode(action.payload.token).role,
        'statusText':'您已经成功登陆'
      });
      break;
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
          'isAuthenticating': false,
          'isAuthenticated': false,
          'token': null,
          'userName': null,
          'role':null,
          'statusText': action.payload.statusText
      });
      break;
    case LOGOUT_USER:
      return Object.assign({}, state, {
         'isAuthenticated': false,
         'token': null,
         'userName': null,
         'role':null,
         'statusText': '您已经成功退出'
      });
      break;
    // case LOGIN_USER_EXPIRE_ON:
    //   break;
    default: return state;

  }
};

export default authReducer;
