import {
  GET_USERS_STARTED,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USER_SUCCESS,
  GET_USER,
  GET_USER_FAIL,
  UPDATE_USER_PHOTO_SUCCESS,
  UPDATE_USER_PHOTO_FAIL,
  UPDATE_USER_PHOTO_STARTED
} from '../constants';

const initialState = {loading: false, users: [], error: null};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      case UPDATE_USER_PHOTO_STARTED: 
      return {
          ...state
  }
  case UPDATE_USER_PHOTO_SUCCESS: 
      return {
          ...state,
          notes: state.notes.concat(action.payload)
      }
  case UPDATE_USER_PHOTO_FAIL:
      return { 
          ...state, 
          error: action.payload.error 
      };
    case GET_USER:
      return {...state, loading: false, user: action.user};

    default:
      return state;
  }
}
