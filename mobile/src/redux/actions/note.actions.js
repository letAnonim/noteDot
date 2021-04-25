import {
    UPDATE_NOTE_TEXT_STARTED,
    UPDATE_NOTE_TEXT_SUCCESS,
    UPDATE_NOTE_TEXT_FAIL,
    SET_DEFAULT_NOTE_STATE,
    UPDATE_NOTE_PROPRETIES_STARTED,
    UPDATE_NOTE_PROPRETIES_SUCCESS,
    UPDATE_NOTE_PROPRETIES_FAIL,
    baseIp,
  } from '../constants';
  import axios from 'axios';
  import {TouchableHighlight} from 'react-native';
  const client = axios.create({
    baseURL: baseIp,
    responseType: 'json',
  });

export function setDefaultNote(){
  return dispatch => {
    dispatch(setDefaultNoteState())
  }
}
  // оновити дані про нотатку (текст)
export function updateNoteText(data) {
  
  return async (dispatch) => {
      dispatch(updateNoteTextStarted());
      try {
        await client.put('/api/notes/update', data).then((res) => {
            dispatch(updateNoteTextSuccess(res.data));
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
        dispatch(updateNoteTextFail(err.message));
      }
    };
}
  // оновити дані про нотатку (назва, колір)
export function updateNoteParams(data) {
  return async (dispatch) => {
      dispatch(updateNotePropertiesStarted());
      try {
        await client.put('/api/notes/update', data).then((res) => {
            dispatch(updateNotePropertiesSuccess(res.data));
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
        dispatch(updateNotePropertiesFail(err.message));
      }
    };
}

const updateNoteTextSuccess = (note) => ({
    type: UPDATE_NOTE_TEXT_SUCCESS,
    payload: note,
});

const updateNoteTextStarted = () => ({
    type: UPDATE_NOTE_TEXT_STARTED,
});

const updateNoteTextFail = (error) => ({
    type: UPDATE_NOTE_TEXT_FAIL,
    payload: {
        error,
    },
});

const updateNotePropertiesStarted = () => ({
  type: UPDATE_NOTE_PROPRETIES_STARTED,
});

const updateNotePropertiesSuccess = (note) => ({
  type: UPDATE_NOTE_PROPRETIES_SUCCESS,
  payload: note,
});

const updateNotePropertiesFail = (error) => ({
  type: UPDATE_NOTE_PROPRETIES_FAIL,
  payload: {
      error,
  },
});

const setDefaultNoteState = () => ({
  type: SET_DEFAULT_NOTE_STATE,
});