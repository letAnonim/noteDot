import {
  GET_USER,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_STARTED,
  ADD_USER_STARTED,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
} from '../constants';
import axios from 'axios';
import {TouchableHighlight} from 'react-native';
const client = axios.create({
  baseURL: 'http://192.168.1.101:6666/',
  responseType: 'json',
});
export function getUsers() {
  return async (dispatch) => {
    dispatch(getUsersStarted());
    try {
      await client.get('/api/users').then((res) => {
        //   console.log(res)
        dispatch(getUsersSuccess(res.data));
      });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.error('Error:', err.message);
      }
      dispatch(getUsersFail(err.message));
    }
  };
}

export function getUser(user) {
  const request = client.get(`/api/users/${user}`);
  return (dispatch) => {
    request.then(({data}) => {
      dispatch({
        type: GET_USER,
        user: data,
      });
    });
  };
}


export function addUser(user) {
  console.log(user);
  return async (dispatch) => {
    dispatch(addUserStarted());
    try {
      await client.post('/api/user', user).then((res) => {
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
    // request.then(({data}) => {
    // })
  };
}

//update user 
export function updateUserPhoto(user) {
  return async (dispatch) => {
    dispatch(updateUserPhotoStarted());
    try {
      await axios({
        uri: `http://192.168.1.101:6666/api/user`,
        responseType: 'json',
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }, user).then((res) => {
        dispatch(updateUserPhotoSuccess(res.data));
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
    // request.then(({data}) => {});
  };
}


const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: {
    ...users,
  },
});

const getUsersStarted = () => ({
  type: GET_USERS_STARTED,
});

const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  payload: {
    error,
  },
});

const addUserStarted = () => ({
  type: ADD_USER_STARTED,
});
const addUserSuccess = (users) => ({
  type: ADD_USER_SUCCESS,
  payload: users,
});

const addUserFail = (error) => ({
  type: ADD_USER_FAIL,
  payload: {
    error,
  },
});

const updateUserPhotoStarted = () => ({
  type: UPDATE_USER_STARTED,
});

const updateUserPhotoSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

const updateUserPhotoFail = (error) => ({
  type: UPDATE_USER_FAIL,
  payload: {
    error,
  },
});