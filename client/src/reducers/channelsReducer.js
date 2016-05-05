import * as cActions from  '../constants/channelsConstants';


const initialState = {
    channelsData: [],
    isExecing: false,
    loading: false,
    statusText: ''
};

const channelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case cActions.CHANNELS_SHOW_REQUEST:
        case cActions.CHANNELS_CREATE_REQUEST:
        case cActions.CHANNELS_REMOVE_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                isExecing: true,
                statusText: null
            });
            break;
        case cActions.CHANNELS_SHOW_FAILURE:
        case cActions.CHANNELS_CREATE_FAILURE:
        case cActions.CHANNELS_REMOVE_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                isExecing: false,
                statusText: action.payload.statusText
            });
            break;
        case cActions.CHANNELS_SHOW_SUCCESS:
            return Object.assign({}, state, {
                channelsData: action.payload.channelsData,
                loading: false,
                isExecing: false,
                statusText: '获得渠道列表成功'
            });
            break;
        case cActions.CHANNELS_CREATE_SUCCESS:
            return Object.assign({}, state, {
                channelsData: action.payload.channelsData,
                loading: false,
                isExecing: false,
                statusText: '创建渠道列表成功'
            });
            break;
        case cActions.CHANNELS_REMOVE_SUCCESS:
            return Object.assign({}, state, {
                channelsData: action.payload.channelsData,
                loading: false,
                isExecing: false,
                statusText: '删除渠道列表成功'
            });
            break;
        default:
            return state;

    }
};

export default channelsReducer
