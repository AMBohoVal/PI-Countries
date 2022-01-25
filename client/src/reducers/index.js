import { GET_COUNTRY } from "../actions/index";

const initialState = {
  country : []
}

function rootReducer(state = initialState, action){
  switch(action.type){
    case GET_COUNTRY:
      return {
        ...state,
        country: action.payload
      };
    
     default:
      return state;
  }
}

export default rootReducer;