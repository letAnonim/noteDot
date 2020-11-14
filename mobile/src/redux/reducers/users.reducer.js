import {GET_USER, GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAIL, GET_USER_SUCCESS, GET_USER_FAIL} from '../constants'

const initialState = { users:[], loadingProfile:true };

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, loading: false, users: action.users };
    // case GET_USERS_SUCCESS:
    //   return { ...state, loading: false, users: action.payload.data };
    // case GET_USERS_FAIL:
    //   return { ...state, loading: false, error: 'Error getting users info' };
    // case GET_USER_INFO:
    //   return { ...state, loadingInfo: true };
    // case GET_USER_INFO_SUCCESS:
    //   return { ...state, loadingInfo: false, repoInfo: action.payload.data };
    // case GET_USER_INFO_FAIL:
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     loadingInfo: false,
    //     errorInfo: 'Error getting repo info'
    //   };
    case GET_USER:
      return { ...state, loading: false, user: action.user };

    // case GET_USER_SUCCESS:
    //   return { ...state, loadingProfile: false, user: action.payload.data };
    // case GET_USER_FAIL:
    //   return {
    //     ...state,
    //     loadingProfile: false,
    //     errorUser: 'Error getting user info'
    //   };
    default:
      return state;
  }
}

