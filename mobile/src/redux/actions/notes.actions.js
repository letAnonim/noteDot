import {GET_NOTE, GET_NOTES, GET_NOTES_SUCCESS, GET_NOTES_FAIL, GET_NOTES_STARTED} from '../constants'
import axios from 'axios';
import { TouchableHighlight } from 'react-native';
const client = axios.create({
    baseURL: 'http://192.168.1.100:6666/',
    responseType: 'json'
});
export function getnotes() {
    return async dispatch => {
        dispatch(getNotesStarted());
        try{
            await client.get('/api/notes')
              .then(res => {
                //   console.log(res)
                  dispatch(getNotesSuccess(res.data));
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
                dispatch(getNotesFail(err.message));
        };
    };

}


export function getNotes(note) {
    const request = client.get(`/api/notes/${note}`);
    return dispatch=>{
        request.then(({data})=>{
        dispatch({
            type: GET_note,
            note: data
        }) 
        })
    }
}

const getNotesSuccess = notes => ({
    type: GET_noteS_SUCCESS,
    payload: {
      ...notes
    }
  });
  
  const getNotesStarted = () => ({
    type: GET_noteS_STARTED
  });
  
  const getNotesFail = error => ({
    type: GET_noteS_FAIL,
    payload: {
      error
    }
  });