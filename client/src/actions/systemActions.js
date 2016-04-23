/**
* Action
* 控制系统内置变量
*/
import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON ,formatErrMsg } from '../utils';
import {GET_CATEGORIES_SUCCESS,GET_CATEGORIES_FAILURE} from '../constants/systemConstants';

export function getCategoriesSuccess(categories){
  return{
    type:GET_CATEGORIES_SUCCESS,
    payload:{
      categories:categories
    }
  }
};
export function getCategoriesFailure(error){
  return{
    type:GET_CATEGORIES_FAILURE,
    payload:{
      statusText: error.response.statusText
    }
  }
};
export function getCategories(){
  return function(dispatch,getState){
    return fetch('/api/system/getCategories',{
      method: 'get',
      credentials: 'include',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${getState().auth.token}`
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response=>{
      if(response.errCode==0){
        dispatch(getCategoriesSuccess(response.data.categories));
      }else{
        dispatch(saveProjectContentFailure({
          response:{
            status:response.errCode,
            statusText:formatErrMsg(response)
          }
        }));
      }
    })
    .catch(error=>{
      error.response.text().then(text=>{
        error.response={status:error.response.status,statusText:text}
        dispatch(saveProjectContentFailure(error));
      });
    })
  }
};
