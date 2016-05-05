import fetch from 'isomorphic-fetch';
import * as cActions from  '../constants/channelsConstants';
import {checkHttpStatus, parseJSON, formatErrMsg} from '../utils';

export function getChannelsAllRequest() {
    return {
        type: cActions.CHANNELS_SHOW_REQUEST
    }
};

export function getChannelsAllFailure(error) {
    return {
        type: cActions.CHANNELS_SHOW_FAILURE,
        payload: {
            statusText: error.response.statusText
        }
    }
};

export function getChannelsAllSuccess(result) {
    return {
        type: cActions.CHANNELS_SHOW_SUCCESS,
        payload: {
            channelsData: result
        }
    }
};

//获取当前用户所有渠道
export function getChannelsAll(query) {
    return function (dispatch, getState) {
        dispatch(getChannelsAllRequest());
        return fetch('/api/channels/getChannelsAll', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({query: (query !== null && query.length > 0) ? query : ""})
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(getChannelsAllSuccess(response.data.result));
                } else {
                    dispatch(getChannelsAllFailure({
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
                        dispatch(getChannelsAllFailure(error));
                    })
                }
            })
    }
};

export function createChannelsRequest() {
    return {
        type: cActions.CHANNELS_CREATE_REQUEST
    }
};

export function createChannelsFailure(error) {
    return {
        type: cActions.CHANNELS_CREATE_FAILURE,
        payload: {
            statusText: error.response.statusText
        }
    }
};

export function createChannelsSuccess(result) {
    return {
        type: cActions.CHANNELS_CREATE_SUCCESS,
        payload: {
            channelsData: result
        }
    }
};

//新增渠道
export function createChannels(code, name) {
    return function (dispatch, getState) {
        dispatch(createChannelsRequest());
        return fetch('/api/channels/createChannels', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({code: code, name: name})
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(createChannelsSuccess(response.data.result));
                } else {
                    dispatch(createChannelsFailure({
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
                        dispatch(createChannelsFailure(error));
                    });
                }
            })
    }
};

export function removeChannelsRequest() {
    return {
        type: cActions.CHANNELS_REMOVE_REQUEST
    }
};

export function removeChannelsFailure(error) {
    return {
        type: cActions.CHANNELS_REMOVE_FAILURE,
        payload: {
            statusText: error.response.statusText
        }
    }
};

export function removeChannelsSuccess(result) {
    return {
        type: cActions.CHANNELS_REMOVE_SUCCESS,
        payload: {
            channelsData: result
        }
    }
};

//删除渠道
export function removeChannels(id) {
    return function (dispatch, getState) {
        dispatch(removeChannelsRequest());
        return fetch('/api/channels/removeChannels', {
                method: 'post',
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
                    dispatch(removeChannelsSuccess(response.data.result));
                } else {
                    dispatch(removeChannelsFailure({
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
                        dispatch(removeChannelsFailure(error));
                    });
                }
            })
    }
};