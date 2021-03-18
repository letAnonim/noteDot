import {
    UPDATE_USER_PHOTO_SUCCESS,
    UPDATE_USER_PHOTO_FAIL,
    UPDATE_USER_PHOTO_STARTED,
  } from '../constants';
  
  const initialState = {status:"inactive", loading:false, error:null, user: {}};
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case UPDATE_USER_PHOTO_STARTED: 
        return {
          ...state,
          status:"updatingUserPhoto",
          loading:true
        };
      case UPDATE_USER_PHOTO_SUCCESS: 
        return {
          ...state,
          status:"updateUserPhotoSucceeded",
          loading:false,
        };
      case UPDATE_USER_PHOTO_FAIL:
        return { 
          ...state, 
          status:"updateUserPhotoFailed",
          loading:false,
          error: action.payload.error
        };
      default:
        return state;
      }
  }
  