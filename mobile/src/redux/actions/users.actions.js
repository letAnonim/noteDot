import {GET_USER, GET_USERS} from '../constants'
import axios from 'axios';
export function getUsers() {
  const request = axios.get('/api/users/');
  return dispatch=>{
    request.then(({data})=>{
      dispatch({
        type: GET_USERS,
        users: data
      }) 
    })
  }
}


export function getUser(user) {
  const request = axios.get(`/api/users/${user}`);
  return dispatch=>{
    request.then(({data})=>{
      dispatch({
        type: GET_USER,
        user: data
      }) 
    })
  }
}

