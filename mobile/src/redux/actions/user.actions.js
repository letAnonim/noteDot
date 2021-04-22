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
  SET_DEFAULT_STATE
} from '../constants';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.1.107:6666/',
  responseType: 'json',
});

export function updateUserPhoto(data) {
  console.log(data);
  return async (dispatch) => {
    dispatch(updateUserPhotoStarted());
    try {
      await client.put('/api/user/photoupdate', data).then((res) => {
        dispatch(updateUserPhotoSuccess(res.data));
        console.log('response', res.data);
      });
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.error('Error:', err.message);
      }
      dispatch(updateUserPhotoFail(err.message));
    }
  };
}

export function regUser(user) {
  return async (dispatch) => {
    dispatch(addUserStarted());
    try {
      await client.post('/api/user/reg', user).then((res) => {
        dispatch(addUserSuccess(res.data));
      });
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.error('Error:', err.message);
      }
      dispatch(addUserFail(err.message));
    }
  };
}

export function checkUser(data) {
  return async (dispatch) => {
    dispatch(checkUserStarted());
    try {
      await client.post('/api/user/log', data).then((res) => {
        dispatch(checkUserSuccess(res.data));
      });
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.error('Error:', err.message);
      }
      dispatch(checkUserFail(err.message));
    }
  };
}

export function setDefault(){
  return dispatch => {
    dispatch(setDefaultState())
  }

}
const setDefaultState = () => ({
  type: SET_DEFAULT_STATE,
});

const updateUserPhotoStarted = () => ({
  type: UPDATE_USER_PHOTO_STARTED,
});

const updateUserPhotoSuccess = (user) => ({
  type: UPDATE_USER_PHOTO_SUCCESS,
  payload: user,
});

const updateUserPhotoFail = (error) => ({
  type: UPDATE_USER_PHOTO_FAIL,
  payload: {
    error,
  },
});
const addUserStarted = () => ({
  type: ADD_USER_STARTED,
});

const addUserSuccess = (data) => ({
  type: ADD_USER_SUCCESS,
  payload: data,
});

const addUserFail = (error) => ({
  type: ADD_USER_FAIL,
  payload: {
    error,
  },
});
const checkUserStarted = () => ({
  type: CHECK_USER_STARTED,
});

const checkUserSuccess = (data) => ({
  type: CHECK_USER_SUCCESS,
  payload: data,
});

const checkUserFail = (error) => ({
  type: CHECK_USER_FAIL,
  payload: {
    error,
  },
});
