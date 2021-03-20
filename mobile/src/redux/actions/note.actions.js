import {
    UPDATE_NOTE_TEXT_STARTED,
    UPDATE_NOTE_TEXT_SUCCESS,
    UPDATE_NOTE_TEXT_FAIL,
  } from '../constants';
  import axios from 'axios';
  import {TouchableHighlight} from 'react-native';
  const client = axios.create({
    baseURL: 'http://192.168.1.105:6666/',
    responseType: 'json',
  });

  // оновити дані про нотатку (текст)
export function updateNoteText(data) {
    return async (dispatch) => {
      dispatch(updateNoteTextStarted());
      try {
        await client.put('/api/notes/text', data).then((res) => {
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