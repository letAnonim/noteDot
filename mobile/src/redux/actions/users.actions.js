import {GET_USER, GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAIL, GET_USERS_STARTED} from '../constants'
import axios from 'axios';
import { TouchableHighlight } from 'react-native';
const client = axios.create({
    baseURL: 'http://192.168.1.100:6666/',
    responseType: 'json'
});
export function getUsers() {
    return async dispatch => {
        dispatch(getUsersStarted());
        try{
            await client.get('/api/users')
              .then(res => {
                //   console.log(res)
                  dispatch(getUsersSuccess(res.data));
              })
        } catch(err) {
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
        };
    };

}


export function getUser(user) {
    const request = client.get(`/api/users/${user}`);
    return dispatch=>{
        request.then(({data})=>{
        dispatch({
            type: GET_USER,
            user: data
        }) 
        })
    }
}

const getUsersSuccess = users => ({
    type: GET_USERS_SUCCESS,
    payload: {
      ...users
    }
  });
  
  const getUsersStarted = () => ({
    type: GET_USERS_STARTED
  });
  
  const getUsersFail = error => ({
    type: GET_USERS_FAIL,
    payload: {
      error
    }
  });