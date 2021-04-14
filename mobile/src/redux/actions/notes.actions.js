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
  FIND_NOTE_SUCCESS,
  FIND_NOTE_STARTED,
  FIND_NOTE_FAIL,
  UPDATE_NOTE_TEXT_STARTED,
  UPDATE_NOTE_TEXT_SUCCESS,
  UPDATE_NOTE_TEXT_FAIL,
  UPDATE_NOTE_LIST_STARTED,
  UPDATE_NOTE_LIST_SUCCESS,
  UPDATE_NOTE_LIST_FAIL,
} from '../constants';
import axios from 'axios';
import {TouchableHighlight} from 'react-native';
const client = axios.create({
  baseURL: 'http://192.168.1.107:6666/',
  responseType: 'json',
});

//update user notes list
export function updateNoteList(user) {
  return async (dispatch) => {
    dispatch(updateNoteListStarted());
    try {
      await client.get(`/api/notes/${user}`).then((res) => {
        dispatch(updateNoteListSuccess(res.data));
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
      dispatch(updateNoteListFail(err.message));
    }
  };
}

//отримуємо нотатки певного юзера
export function getNotes(user) {
  return async (dispatch) => {
    dispatch(getNotesStarted());
    try {
      await client.get(`/api/notes/${user}`).then((res) => {
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

//додати нотатку
export function addNote(note) {
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
  };
}
//видалити нотатку
export function deleteNote(user, note) {
  return async (dispatch) => {
    dispatch(deleteNoteStarted());
    try {
      await client.delete(`/api/notes/${user}/${note}`).then((res) => {
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

//знайти і додати ноттаку за id 
export function findNote(user_id, note_id) {
  return async (dispatch) => {
    dispatch(findNoteStarted());
    try {
      await client.put(`/api/notes/${note_id}/${user_id}`).then((res) => {
        dispatch(findNoteSuccess(res.data));
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
      dispatch(findNoteFail(err.message));
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
    error
  }
});

const findNoteSuccess = (notes) => ({
  type: FIND_NOTE_SUCCESS,
  payload: notes,
});

const findNoteStarted = () => ({
  type: FIND_NOTE_STARTED,
});

const findNoteFail = (error) => ({
  type: FIND_NOTE_FAIL,
  payload: {
    error,
  },
});

const updateNoteListStarted = (notes) => ({
  type: UPDATE_NOTE_LIST_STARTED
});

const updateNoteListSuccess = (notes) => ({
  type: UPDATE_NOTE_LIST_SUCCESS,
  payload: notes
});

const updateNoteListFail = (error) => ({
  type: UPDATE_NOTE_LIST_FAIL,
  payload: {
    error,
  },
});