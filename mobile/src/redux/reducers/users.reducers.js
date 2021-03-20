import {
  GET_USERS_STARTED,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USER,

} from '../constants';

const initialState = {status:"inactive", loading:false, error:null, users: []};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_STARTED:
      return {
        ...state,
        status:"gettingUsers",
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        status:"getUsersSucceeded",
        loading: false,
        users: action.payload,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        status:"getUsersFail",
        loading: false,
        error: action.payload.error,
      };
    case GET_USER:
        return {...state, loading: false, user: action.user};
    default:
        return state;
    }
}
