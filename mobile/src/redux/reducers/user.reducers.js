import { ActionSheetIOS } from 'react-native';
import {
  UPDATE_USER_PHOTO_SUCCESS,
  UPDATE_USER_PHOTO_FAIL,
  UPDATE_USER_PHOTO_STARTED,
  ADD_USER_STARTED,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  CHECK_USER_STARTED,
  CHECK_USER_SUCCESS,
  CHECK_USER_FAIL,
  SET_DEFAULT_STATE,
} from '../constants';

const initialState = {
  status: 'inactive',
  access: undefined,
  response: undefined,
  loading: false,
  error: null,
  user: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DEFAULT_STATE:
      return {
        ...state,
        status: initialState.status,
        access: initialState.access,
        response: initialState.response,
        loading: initialState.loading,
      };
    case UPDATE_USER_PHOTO_STARTED:
      return {
        ...state,
        status: 'updatingUserPhoto',
        loading: true,
      };
    case UPDATE_USER_PHOTO_SUCCESS:
      return {
        ...state,
        status: 'updateUserPhotoSucceeded',
        loading: false,
      };
    case UPDATE_USER_PHOTO_FAIL:
      return {
        ...state,
        status: 'updateUserPhotoFailed',
        loading: false,
        error: action.payload.error,
      };
    case ADD_USER_STARTED:
      return {
        ...state,
        status: 'addingUser',
        loading: true,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        status: 'addUserSuccess',
        response: action.payload,
        loading: false,
      };
    case ADD_USER_FAIL:
      return {
        ...state,
        status: 'addUserFail',
        loading: false,
        error: action.payload.error,
      };
    case CHECK_USER_STARTED:
      return {
        ...state,
        status: 'checkingUser',
        loading: true,
      };
    case CHECK_USER_SUCCESS:
    return {
        ...state,
        status: 'checkUserSuccess',
        access: action.payload.access,
        user: action.payload.data,
        loading: false
      };
    case CHECK_USER_FAIL:
      return {
        ...state,
        status: 'checkUserFail',
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
