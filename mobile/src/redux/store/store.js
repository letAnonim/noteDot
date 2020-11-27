import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import noteReducer from '../reducers/notes.reducer';
import usersReducer from '../reducers/users.reducer';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
    notes: noteReducer,
    users: usersReducer
})
const client = axios.create({
    baseURL: 'http://localhost:6666',
    responseType: 'json'
});
const store = createStore(rootReducer, compose(applyMiddleware(logger, thunk, axiosMiddleware(client))));


export default store;