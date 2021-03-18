import {
    UPDATE_USER_PHOTO_SUCCESS,
    UPDATE_USER_PHOTO_FAIL,
    UPDATE_USER_PHOTO_STARTED, 
} from '../constants';
import axios from 'axios';
import {TouchableHighlight} from 'react-native';
  
const client = axios.create({
    baseURL: 'http://192.168.1.105:6666/',
    responseType: 'json',
});

export function updateUserPhoto(data) {
    console.log(data);
    return async (dispatch) => {
      dispatch(updateUserPhotoStarted());
      try {
          await client.put("/api/user/photoupdate", data).then((res) => {
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