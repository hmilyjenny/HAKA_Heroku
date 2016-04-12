import { browserHistory} from 'react-router';
import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON } from '../utils';
import {LOGIN_USER_SUCCESS,LOGIN_USER_REQUEST,LOGOUT_USER,LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,REGISTER_USER_FAILURE} from '../constants/authConstants';

//const baseURL = 'http://localhost:3000';
export function registerSuccess() {
  return {
    type: REGISTER_USER_SUCCESS
  }
}
export function registerRequest() {
  return {
    type: REGISTER_USER_REQUEST
  }
}
export function registerFailure(error){
  return{
    type:REGISTER_USER_FAILURE,
    payload:{
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}
export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}
export function loginUserFailure(error){
  localStorage.removeItem('token');
  return{
    type:LOGIN_USER_FAILURE,
    payload:{
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}
export function logoutAndRedirect() {
      return (dispatch, state) => {
          dispatch(logout());
          browserHistory.push('/');
      }
  }
export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function loginUser(email, password, redirect="/") {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch('/api/auth/signIn/', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({email: email, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
              dispatch(loginUserSuccess(response.token));
              browserHistory.push(redirect);
              //dispatch(pushState(null, redirect));
            })
            .catch(error => {
                  error.response.text().then(text=>{
                    error.response={status:error.response.status,statusText:text}
                    dispatch(loginUserFailure(error));
                  });
            })
        }
  }
  export function register(email,password,inviteCode,redirect="/"){
    return function(dispatch){
      dispatch(registerRequest());
      return fetch('/api/auth/register',{
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({email: email, password: password,inviteCode:inviteCode})
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response=>{
        dispatch(registerSuccess());
        browserHistory.push(redirect);
        //dispatch(pushState(null, redirect));
      })
      .catch(error => {
            error.response.text().then(text=>{
              error.response={status:error.response.status,statusText:text}
              dispatch(registerFailure(error));
            });
      })
    }
  }
