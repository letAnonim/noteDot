import {
  GET_USER,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_STARTED,
  UPDATE_USER_STARTED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../constants';
import axios from 'axios';
import {TouchableHighlight} from 'react-native';
const client = axios.create({
  baseURL: 'http://192.168.1.3:6666/',
  responseType: 'json',
});

export function getUsers() {
  return async (dispatch) => {
    dispatch(getUsersStarted());
    try {
      await client.get('/api/users').then((res) => {

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

export function updateUser(user) {
  console.log(user);
  console.log('console.log')
  return async (dis5patch) => {
    dispatch(updateUserStarted());
    try {
        await client.put('/api/user/photo', user).then((res) => {
            dispatch(updateUserSuccess(res.data));
        });
        console.log('here')
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
      dispatch(updateUserFail(err.message));
      console.log('end')
    }
    console.log('final end')
  };
}
  
      // await axios.post({
      //   uri: `http://192.168.1.104:6666/api/user`,
      //   // responseType: 'json',
      //   method: 'POST',
      //   // data: formData,
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }, user)
      




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

const updateUserStarted = () => ({
  type: UPDATE_USER_STARTED,
});

const updateUserSuccess = (users) => ({
  type: UPDATE_USER_SUCCESS,
  payload: users,
});

const updateUserFail = (error) => ({
  type: UPDATE_USER_FAIL,
  payload: {
    error,
  },
});