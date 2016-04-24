import fetch from 'isomorphic-fetch';
import  {SAVE_REQUEST,SAVE_FAILURE,PROJECT_NAME_SAVE_SUCCESS,PROJECT_CATEGORY_SAVE_SUCCESS,
  PROJECT_CHANNEL_SAVE_SUCCESS,PROJECT_AUDIO_SAVE_SUCCESS,
  PROJECT_IMAGE_SAVE_SUCCESS,PROJECT_FINISHED_SUCCESS} from  '../constants/projectConstants';
import { checkHttpStatus, parseJSON ,formatErrMsg } from '../utils';

//提交存储project内容请求
export function saveProjectContentRequest(){
  return {
    type: SAVE_REQUEST
  }
};
//存储project内容失败
export function saveProjectContentFailure(error,currentStep){
  return{
    type:SAVE_FAILURE,
    payload:{
      statusText: error.response.statusText,
      step:currentStep
    }
  }
};
//存储project名字成功
export function saveProjectNameSuccess(newProject){
  return{
    type:PROJECT_NAME_SAVE_SUCCESS,
    payload:{
      projectName:newProject.name,
      projectId:newProject._id,
      step:newProject.step
    }
  }
};
//请求存储project名称
export function createProjectName(name,currentStep,token){
  return function(dispatch,getState) {
    dispatch(saveProjectContentRequest());
    return fetch('/api/project/createProjectName',{
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${getState().auth.token}`
        },
        body: JSON.stringify({name: name,currentStep:currentStep})
      }
    )
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response =>{
      if(response.errCode==0){
        dispatch(saveProjectNameSuccess(response.data.newProject));
      }else{//这应该在重构中提出方法来
        dispatch(saveProjectContentFailure({
          response:{
            status:response.errCode,
            statusText:formatErrMsg(response)
          }
        },currentStep));
      }
    })
    .catch(error => {
          error.response.text().then(text=>{
            error.response={status:error.response.status,statusText:text}
            dispatch(saveProjectContentFailure(error,currentStep));
          });
    })
  }
};
//通过id获得项目
export function getProjectById(id){

};
//存储project品类成功
export function saveProjectCategorySuccess(newProject){
  return{
    type:PROJECT_CATEGORY_SAVE_SUCCESS,
    payload:{
      category:newProject.categories,
      step:newProject.step
    }
  }
};
//存储project品类
export function savaProjectCategory(currentStep,category)
{
  return function(dispatch,getState){
    dispatch(saveProjectContentRequest());
    return fetch('/api/project/createProjectCategories',{
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${getState().auth.token}`
        },
        body: JSON.stringify({projectId:getState().project.projectId,
          category:category,currentStep:currentStep})
      }
    )
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response =>{
      if(response.errCode==0){
        dispatch(saveProjectCategorySuccess(response.data.newProject));
      }else{//这应该在重构中提出方法来
        dispatch(saveProjectContentFailure({
          response:{
            status:response.errCode,
            statusText:formatErrMsg(response)
          }
        },currentStep));
      }
    })
    .catch(error => {
          error.response.text().then(text=>{
            error.response={status:error.response.status,statusText:text}
            dispatch(saveProjectContentFailure(error,currentStep));
          });
    })
  }
};
