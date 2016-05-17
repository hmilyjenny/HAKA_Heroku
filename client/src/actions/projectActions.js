import fetch from 'isomorphic-fetch';
import  {
    SAVE_REQUEST, SAVE_FAILURE, PROJECT_NAME_SAVE_SUCCESS, PROJECT_CATEGORY_SAVE_SUCCESS,
    PROJECT_CHANNEL_SAVE_SUCCESS, PROJECT_AUDIO_SAVE_SUCCESS,
    PROJECT_IMAGE_SAVE_SUCCESS, PROJECT_FINISHED_SUCCESS,
    PROJECT_GET_PROJECTINFO_REQUEST, PROJECT_GET_PROJECTINFO_FAILURE, PROJECT_GET_PROJECTINFO_SUCCESS,
    PROJECT_SET_STEP_REQUEST, PROJECT_SET_STEP_FAILURE, PROJECT_SET_STEP_SUCCESS,
    PROJECT_GET_PROJECTSLIST_REQUEST, PROJECT_GET_PROJECTSLIST_FAILURE, PROJECT_GET_PROJECTSLIST_SUCCESS,
    PROJECT_REMOVE_REQUEST, PROJECT_REMOVE_FAILURE, PROJECT_REMOVE_SUCCESS
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
            projectId: newProject._id,
            projectName: newProject.name,
            audioFile: newProject.audioFile,
            imageFiles: newProject.imageFiles,
            channels: newProject.channels,
            category: newProject.category,
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
export function getProjectById(projectId) {
    return function (dispatch, getState) {
        dispatch(getProjectByIdRequest());
        return fetch('/api/project/getProjectById/' + projectId, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getState().auth.token}`
                }
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    if (response.data.project.imageFiles && response.data.project.imageFiles.length > 0) {
                        response.data.project.imageFiles.map((item)=>{
                            delete item.imageBuffer;
                        })
                    }
                    dispatch(getProjectByIdSuccess(response.data.project));
                } else {
                    dispatch(getProjectByIdFailure({
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
                        dispatch(getProjectByIdFailure(error));
                    })
                }
            })
    }
};
export function getProjectByIdRequest() {
    return {type: PROJECT_GET_PROJECTINFO_REQUEST}
}
export function getProjectByIdFailure(error) {
    return {
        type: PROJECT_GET_PROJECTINFO_FAILURE,
        payload: {
            statusText: error.response.statusText,
            step: 1
        }
    }
}
export function getProjectByIdSuccess(project) {
    return {
        type: PROJECT_GET_PROJECTINFO_SUCCESS,
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

//存储project品类成功
export function saveProjectCategorySuccess(newProject) {
    return {
        type: PROJECT_CATEGORY_SAVE_SUCCESS,
        payload: {
            category: newProject.category,
            step: newProject.step
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
                    if (response.data.newProject.imageFiles && response.data.newProject.imageFiles.length > 0) {
                        response.data.newProject.imageFiles.map((item)=>{
                            delete item.imageBuffer;
                        })
                    }
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

export function setProjectStepRequest() {
    return {type: PROJECT_SET_STEP_REQUEST}
}
export function setProjectStepFailure(error, currentStep) {
    return {
        type: PROJECT_SET_STEP_FAILURE,
        payload: {
            statusText: error.response.statusText,
            step: currentStep
        }
    }
}
export function setProjectStepSuccess(newProject) {
    return {
        type: PROJECT_SET_STEP_SUCCESS,
        payload: {
            step: newProject.step
        }
    }
}
export function setProjectStep(currentStep) {
    return function (dispatch, getState) {
        dispatch(setProjectStepRequest());
        return fetch('/api/project/setProjectStep', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({
                    projectId: getState().project.projectId,
                    currentStep: currentStep
                })
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(setProjectStepSuccess(response.data.newProject));
                } else {
                    dispatch(setProjectStepFailure({
                        response: {
                            status: response.errCode,
                            statusText: formatErrMsg(response)
                        }
                    }, currentStep));
                }
            })
            .catch(error => {
                if (error.response) {
                    error.response.text().then(text=> {
                        error.response = {status: error.response.status, statusText: text}
                        dispatch(setProjectStepFailure(error, currentStep));
                    })
                }
            })
    }
}

export function getProjectsListInfoRequest() {
    return {type: PROJECT_GET_PROJECTSLIST_REQUEST}
}
export function getProjectsListInfoFailure(error) {
    return {
        type: PROJECT_GET_PROJECTSLIST_FAILURE,
        payload: {
            statusText: error.response.statusText
        }
    }
}
export function getProjectsListInfoSuccess(projectsList) {
    return {
        type: PROJECT_GET_PROJECTSLIST_SUCCESS,
        payload: {
            projectsList: projectsList
        }
    }
}
export function getProjectsListInfo(query) {
    return function (dispatch, getState) {
        dispatch(getProjectsListInfoRequest());
        return fetch('/api/project/getProjectsListInfo', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getState().auth.token}`
                },
                body: query
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(getProjectsListInfoSuccess(response.data.result));
                } else {
                    dispatch(getProjectsListInfoFailure({
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
                        dispatch(getProjectsListInfoFailure(error));
                    })
                }
            })
    }
}

export function removeProjectRequest() {
    return {type: PROJECT_REMOVE_REQUEST}
}
export function removeProjectFailure(error) {
    return {
        type: PROJECT_REMOVE_FAILURE,
        payload: {
            statusText: error.response.statusText
        }
    }
}
export function removeProjectSuccess(projectsList) {
    return {
        type: PROJECT_REMOVE_SUCCESS,
        payload: {
            projectsList: projectsList
        }
    }
}
export function removeProject(id) {
    return function (dispatch, getState) {
        dispatch(removeProjectRequest());
        return fetch('/api/project/removeProject', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({id: id})
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(removeProjectSuccess(response.data.result));
                } else {
                    dispatch(removeProjectFailure({
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
                        dispatch(removeProjectFailure(error));
                    })
                }
            })
    }
}