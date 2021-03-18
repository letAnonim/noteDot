import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import usersReducer from '../reducers/users.reducers';
import userReducer from '../reducers/user.reducers';
import notesReducer from '../reducers/notes.reducers';
import noteReducer from '../reducers/note.reducers';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
    users: usersReducer,
    user: userReducer,
    notes: notesReducer,
    note: noteReducer
})
const client = axios.create({
    baseURL: 'http://localhost:6666',
    responseType: 'json'
});
const store = createStore(rootReducer, compose(applyMiddleware(logger, thunk, axiosMiddleware(client))));

export default store;