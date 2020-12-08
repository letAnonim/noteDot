import {
  GET_NOTES_SUCCESS,
  GET_NOTES_FAIL,
  GET_NOTES_STARTED,
  ADD_NOTE_STARTED,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAIL,
  DELETE_NOTE_STARTED,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
} from '../constants';
import axios from 'axios';
import {TouchableHighlight} from 'react-native';
const client = axios.create({
  baseURL: 'http://192.168.1.102:6666/',
  responseType: 'json',
});
export function getAllNotes() {
  return async (dispatch) => {
    dispatch(getNotesStarted());
    try {
      await client.get('/api/notes').then((res) => {
        //   console.log(res)
        dispatch(getNotesSuccess(res.data));
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
      dispatch(getNotesFail(err.message));
    }
  };
}

export function getNotes(user) {
  return async (dispatch) => {
    dispatch(getNotesStarted());
    try {
      await client.get(`/api/notes/${user}`).then((res) => {
        //   console.log(res)
        dispatch(getNotesSuccess(res.data));
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
      dispatch(getNotesFail(err.message));
    }
  };
}
export function addNote(note) {
  console.log(note);
  return async (dispatch) => {
    dispatch(addNoteStarted());
    try {
      await client.post('/api/notes', note).then((res) => {
        dispatch(addNoteSuccess(res.data));
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
      dispatch(addNoteFail(err.message));
    }
    request.then(({data}) => {});
  };
}

export function deleteNote(user, note) {
  return async (dispatch) => {
    dispatch(deleteNoteStarted());
    try {
      await client.delete(`/api/notes/${user}/${note}`).then((res) => {
        //   console.log(res)
        dispatch(deleteNoteSuccess(res.data));
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
      dispatch(deleteNoteFail(err.message));
    }
  };
}
const getNotesSuccess = (notes) => ({
  type: GET_NOTES_SUCCESS,
  payload: notes,
});

const getNotesStarted = () => ({
  type: GET_NOTES_STARTED,
});

const getNotesFail = (error) => ({
  type: GET_NOTES_FAIL,
  payload: {
    error,
  },
});

const addNoteStarted = () => ({
  type: ADD_NOTE_STARTED,
});
const addNoteSuccess = (notes) => ({
  type: ADD_NOTE_SUCCESS,
  payload: notes,
});

const addNoteFail = (error) => ({
  type: ADD_NOTE_FAIL,
  payload: {
    error,
  },
});

const deleteNoteStarted = () => ({
  type: DELETE_NOTE_STARTED,
});
const deleteNoteSuccess = (notes) => ({
  type: DELETE_NOTE_SUCCESS,
  payload: notes,
});

const deleteNoteFail = (error) => ({
  type: DELETE_NOTE_FAIL,
  payload: {
    error,
  },
});
