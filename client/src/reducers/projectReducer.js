import  {
    SAVE_REQUEST, SAVE_FAILURE, PROJECT_NAME_SAVE_SUCCESS, PROJECT_CATEGORY_SAVE_SUCCESS,
    PROJECT_CHANNEL_SAVE_SUCCESS, PROJECT_AUDIO_SAVE_SUCCESS,
    PROJECT_IMAGE_SAVE_SUCCESS, PROJECT_FINISHED_SUCCESS,
    PROJECT_GET_PROJECTINFO_REQUEST, PROJECT_GET_PROJECTINFO_FAILURE, PROJECT_GET_PROJECTINFO_SUCCESS,
    PROJECT_SET_STEP_REQUEST, PROJECT_SET_STEP_FAILURE, PROJECT_SET_STEP_SUCCESS
} from  '../constants/projectConstants';


const initialState = {
    projectId: '',
    projectName: '',
    audioFile: null,
    imageFiles: null,
    channels: null,
    category: null,
    isSaving: false,
    statusText: '',
    step: 1
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROJECT_SET_STEP_REQUEST:
        case PROJECT_GET_PROJECTINFO_REQUEST:
        case SAVE_REQUEST:
            return Object.assign({}, state, {
                'isSaving': true,
                'statusText': null
            });
            break;
        case PROJECT_SET_STEP_FAILURE:
        case PROJECT_GET_PROJECTINFO_FAILURE:
        case SAVE_FAILURE:
            return Object.assign({}, state, {
                'isSaving': false,
                'statusText': action.payload.statusText
            });
            break;
        case PROJECT_NAME_SAVE_SUCCESS:
            return Object.assign({}, state, {
                projectName: action.payload.projectName,
                projectId: action.payload.projectId,
                isSaving: false,
                statusText: '项目建立成功',
                step: action.payload.step
            });
            break;
        case PROJECT_CATEGORY_SAVE_SUCCESS:
            return Object.assign({}, state, {
                category: action.payload.category,
                isSaving: false,
                statusText: '项目品类选择成功',
                step: action.payload.step
            });
            break;
        case PROJECT_CHANNEL_SAVE_SUCCESS:
            return Object.assign({}, state, {
                channels: action.payload.channels,
                isSaving: false,
                statusText: '项目渠道选择成功',
                step: action.payload.step
            });
            break;
        case PROJECT_AUDIO_SAVE_SUCCESS:
            return Object.assign({}, state, {
                audio: action.payload.audio,
                isSaving: false,
                statusText: '项目音频文件上传成功',
                step: action.payload.step
            });
            break;
        case PROJECT_IMAGE_SAVE_SUCCESS:
            return Object.assign({}, state, {
                imageFiles: action.payload.imageFiles,
                isSaving: false,
                statusText: '项目图像文件上传成功'
            });
        case PROJECT_FINISHED_SUCCESS:
            return Object.assign({}, state, {
                statusText: '项目初始化内容完成'
            });
            break;
        case PROJECT_GET_PROJECTINFO_SUCCESS:
            return Object.assign({}, state, {
                isSaving: false,
                statusText: '获取项目信息成功',
                projectId: action.payload.projectId,
                projectName: action.payload.projectName,
                audioFile: action.payload.audioFile,
                imageFiles: action.payload.imageFiles,
                channels: action.payload.channels,
                category: action.payload.category,
                step: action.payload.step
            });
            break;
        case PROJECT_SET_STEP_SUCCESS:
            return Object.assign({}, state, {
                isSaving: false,
                statusText: '修改项目步骤信息成功',
                step: action.payload.step
            });
            break;
        default:
            return state;
    }
};

export default projectReducer;
