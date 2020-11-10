import { createStore, combineReducers } from 'redux';
import noteReducer from '../reducers/notes.reducer';


const rootReducer = combineReducers({
    notes: noteReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;