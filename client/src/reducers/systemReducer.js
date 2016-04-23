import {GET_CATEGORIES_SUCCESS,GET_CATEGORIES_FAILURE} from '../constants/systemConstants'


const initialState ={
  categories:[],
  statusText:''
};

const systemReducer = (state = initialState,action) =>{
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        categories:action.payload.categories,
        statusText:'获得品类列表成功'
      });
      break;
    case GET_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        categories:[],
        statusText:action.payload.statusText
      });
      break;
    default: return state;

  }
};

export default systemReducer
