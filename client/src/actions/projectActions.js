import fetch from 'isomorphic-fetch';
import  {SAVE_REQUEST,SAVE_FAILURE,PROJECT_NAME_SAVE_SUCCESS,PROJECT_CATEGORY_SAVE_SUCCESS,
  PROJECT_CHANNEL_SAVE_SUCCESS,PROJECT_AUDIO_SAVE_SUCCESS,
  PROJECT_IMAGE_SAVE_SUCCESS,PROJECT_FINISHED_SUCCESS} from  '../constants/projectConstants';
import { checkHttpStatus, parseJSON ,formatErrMsg } from '../utils';


export function saveProjectContentRequest(){
  return {
    type: SAVE_REQUEST
  }
};

export function saveProjectContentFailure(error,currentStep){
  return{
    type:SAVE_FAILURE,
    payload:{
      statusText: error.response.statusText,
      step:currentStep
    }
  }
};
export function saveProjectNameSuccess(name,currentStep){
  return{
    type:PROJECT_NAME_SAVE_SUCCESS,
    payload:{
      projectName:name,
      step:currentStep
    }
  }
};
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
        dispatch(saveProjectNameSuccess(name,currentStep+1));
      }else{
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

export function getProjectById(id){

}
