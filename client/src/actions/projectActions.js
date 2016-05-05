import fetch from 'isomorphic-fetch';
import  {
    SAVE_REQUEST, SAVE_FAILURE, PROJECT_NAME_SAVE_SUCCESS, PROJECT_CATEGORY_SAVE_SUCCESS,
    PROJECT_CHANNEL_SAVE_SUCCESS, PROJECT_AUDIO_SAVE_SUCCESS,
    PROJECT_IMAGE_SAVE_SUCCESS, PROJECT_FINISHED_SUCCESS,
    PROJECT_UNFINISHED_REQUEST, PROJECT_UNFINISHED_FAILURE, PROJECT_UNFINISHED_SUCCESS
} from  '../constants/projectConstants';
import {checkHttpStatus, parseJSON, formatErrMsg} from '../utils';

//提交存储project内容请求
export function saveProjectContentRequest() {
    return {
        type: SAVE_REQUEST
    }
};
//存储project内容失败
export function saveProjectContentFailure(error, currentStep) {
    return {
        type: SAVE_FAILURE,
        payload: {
            statusText: error.response.statusText,
            step: currentStep
        }
    }
};
//存储project名字成功
export function saveProjectNameSuccess(newProject) {
    return {
        type: PROJECT_NAME_SAVE_SUCCESS,
        payload: {
            projectName: newProject.name,
            projectId: newProject._id,
            step: newProject.step
        }
    }
};
//请求存储project名称
export function createProjectName(name, currentStep, token) {
    return function (dispatch, getState) {
        dispatch(saveProjectContentRequest());
        return fetch('/api/project/createProjectName', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({name: name, currentStep: currentStep})
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(saveProjectNameSuccess(response.data.newProject));
                } else {//这应该在重构中提出方法来
                    dispatch(saveProjectContentFailure({
                        response: {
                            status: response.errCode,
                            statusText: formatErrMsg(response)
                        }
                    }, currentStep));
                }
            })
            .catch(error => {
                error.response.text().then(text=> {
                    error.response = {status: error.response.status, statusText: text}
                    dispatch(saveProjectContentFailure(error, currentStep));
                });
            })
    }
};
//通过id获得项目
export function getProjectById(id) {

};
//存储project品类成功
export function saveProjectCategorySuccess(newProject){
  return{
    type:PROJECT_CATEGORY_SAVE_SUCCESS,
    payload:{
      category:newProject.category,
      step:newProject.step
    }
  }
};
//存储project品类
export function savaProjectCategory(currentStep, category) {
    return function (dispatch, getState) {
        dispatch(saveProjectContentRequest());
        return fetch('/api/project/createProjectCategories', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({
                    projectId: getState().project.projectId,
                    category: category, currentStep: currentStep
                })
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(saveProjectCategorySuccess(response.data.newProject));
                } else {//这应该在重构中提出方法来
                    dispatch(saveProjectContentFailure({
                        response: {
                            status: response.errCode,
                            statusText: formatErrMsg(response)
                        }
                    }, currentStep));
                }
            })
            .catch(error => {
                error.response.text().then(text=> {
                    error.response = {status: error.response.status, statusText: text}
                    dispatch(saveProjectContentFailure(error, currentStep));
                });
            })
    }
};
//存储project渠道成功
export function saveProjectChannelsSuccess(newProject) {
    return {
        type: PROJECT_CHANNEL_SAVE_SUCCESS,
        payload: {
            channels: newProject.channels,
            step: newProject.step
        }
    }
};
//存储project渠道
export function savaProjectChannels(currentStep, channels) {
    return function (dispatch, getState) {
        dispatch(saveProjectContentRequest());
        return fetch('/api/project/createProjectChannels', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({
                    projectId: getState().project.projectId,
                    channels: channels, currentStep: currentStep
                })
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(saveProjectChannelsSuccess(response.data.newProject));
                } else {//这应该在重构中提出方法来
                    dispatch(saveProjectContentFailure({
                        response: {
                            status: response.errCode,
                            statusText: formatErrMsg(response)
                        }
                    }, currentStep));
                }
            })
            .catch(error => {
                error.response.text().then(text=> {
                    error.response = {status: error.response.status, statusText: text}
                    dispatch(saveProjectContentFailure(error, currentStep));
                });
            })
    }
};
//存储project音频文件成功
export function saveProjectAudioFileSuccess(newProject) {
    return {
        type: PROJECT_AUDIO_SAVE_SUCCESS,
        payload: {
            audioFile: newProject.audioFile,
            step: newProject.step
        }
    }
};

//存储project音频文件
export function savaProjectAudioFile(currentStep, file) {
    return function (dispatch, getState) {
        dispatch(saveProjectContentRequest());
        const data = new FormData();
        data.append('currentStep', currentStep);
        data.append('projectId', getState().project.projectId);
        data.append('file', file);
        return fetch('/api/project/createProjectAudioFile', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    //'Content-Type': 'multipart/form-data',
                    'Authorization': `${getState().auth.token}`
                },
                body: data
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(saveProjectAudioFileSuccess(response.data.newProject));
                } else {//这应该在重构中提出方法来
                    dispatch(saveProjectContentFailure({
                        response: {
                            status: response.errCode,
                            statusText: formatErrMsg(response)
                        }
                    }, currentStep));
                }
            })
            .catch(error => {
                error.response.text().then(text=> {
                    error.response = {status: error.response.status, statusText: text}
                    dispatch(saveProjectContentFailure(error, currentStep));
                });
            })
    }
};
//存储project图像文件成功
export function saveProjectImageFileSuccess(newProject) {
    return {
        type: PROJECT_IMAGE_SAVE_SUCCESS,
        payload: {
            imageFiles: newProject.imageFiles,
            step: newProject.step
        }
    }
};
//存储project图像文件
export function savaProjectImageFiles(currentStep, files) {
    return function (dispatch, getState) {
        dispatch(saveProjectContentRequest());
        const data = new FormData();
        data.append('currentStep', currentStep);
        data.append('projectId', getState().project.projectId);
        files.forEach(function (file) {
            data.append('file', file);
        });
        //data.append('files',files);
        return fetch('/api/project/createProjectImageFiles', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    //'Content-Type': 'multipart/form-data',
                    'Authorization': `${getState().auth.token}`
                },
                body: data
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(saveProjectImageFileSuccess(response.data.newProject));
                } else {//这应该在重构中提出方法来
                    dispatch(saveProjectContentFailure({
                        response: {
                            status: response.errCode,
                            statusText: formatErrMsg(response)
                        }
                    }, currentStep));
                }
            })
            .catch(error => {
                error.response.text().then(text=> {
                    error.response = {status: error.response.status, statusText: text}
                    dispatch(saveProjectContentFailure(error, currentStep));
                });
            })
    }
};

//获取未完成项目内容请求
export function getUnfinishedProjectRequest() {
    return {type: PROJECT_UNFINISHED_REQUEST}
}
//获取未完成项目内容失败
export function getUnfinishedProjectFailure(error) {
    return {
        type: PROJECT_UNFINISHED_FAILURE,
        payload: {
            statusText: error.response.statusText,
            step: 1
        }
    }
}
//获取未完成项目内容成功
export function getUnfinishedProjectSuccess(project) {
    return {
        type: PROJECT_UNFINISHED_SUCCESS,
        payload: {
            projectId: project._id,
            projectName: project.name,
            audioFile: project.audioFile,
            imageFiles: project.imageFiles,
            channels: project.channels,
            category: project.category,
            step: project.step
        }
    }
}
export function getUnfinishedProject(projectId) {
    return function (dispatch, getState) {
        dispatch(getUnfinishedProjectRequest());
        return fetch('/api/project/getUnfinishedProject', {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({
                    projectId: projectId
                })
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(getUnfinishedProjectSuccess(response.data.project));
                } else {
                    dispatch(getUnfinishedProjectFailure({
                        response: {
                            status: response.errCode,
                            statusText: formatErrMsg(response)
                        }
                    }));
                }
            })
            .catch(error => {
                if (error.response) {
                    error.response.text().then(text=> {
                        error.response = {status: error.response.status, statusText: text}
                        dispatch(getUnfinishedProjectFailure(error));
                    })
                }
            })
    }
}
