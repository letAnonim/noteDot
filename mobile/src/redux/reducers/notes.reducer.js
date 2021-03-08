import { 
    GET_NOTES_STARTED, 
    GET_NOTES_FAIL, 
    GET_NOTES_SUCCESS, 
    ADD_NOTE_STARTED,
    ADD_NOTE_SUCCESS,
    ADD_NOTE_FAIL,
    DELETE_NOTE_STARTED,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_FAIL,
    FIND_NOTE_STARTED,
    FIND_NOTE_SUCCESS,
    FIND_NOTE_FAIL,
    UPDATE_NOTE_TEXT_STARTED,
    UPDATE_NOTE_TEXT_SUCCESS,
    UPDATE_NOTE_TEXT_FAIL, 
    UPDATE_NOTE_LIST_STARTED,
    UPDATE_NOTE_LIST_SUCCESS,
    UPDATE_NOTE_LIST_FAIL,
} from '../constants';
const initialState = {status:"inactive", loading:false, error:null, notes: []};
export default function notesReducer(state = initialState, action){
    switch (action.type) {
        case GET_NOTES_STARTED:
            return {
              ...state, 
              status:"gettingNotes",
              loading:true
            };
        case GET_NOTES_SUCCESS:
            return { 
                ...state, 
                status:"getNoteSucceeded", 
                loading:false,
                error:null,
                notes: action.payload
            };
        case GET_NOTES_FAIL:
            return { 
                ...state, 
                status:"getNoteFailed", 
                loading:false,
                error: action.payload.error
            };
        case UPDATE_NOTE_LIST_STARTED:
            return {
                ...state, 
                status:"updatingNoteList",
                loading:true
            };
        case UPDATE_NOTE_LIST_SUCCESS:
            return { 
                ...state, 
                status:"updateNoteListSucceeded", 
                loading:false,
                error:null,
                notes: action.payload
            };
        case UPDATE_NOTE_LIST_FAIL:
            return { 
                ...state, 
                status:"updateNoteListFailed", 
                loading:false,
                error: action.payload.error
            };
        case ADD_NOTE_STARTED: 
            return {
                ...state,
                status:'addindNote',
                loading:true    
            }
        case ADD_NOTE_SUCCESS: 
            return {
                ...state,
                status:"addNoteSucceeded",
                loading:false,
                notes: state.notes.concat(action.payload)
            }
        case ADD_NOTE_FAIL:
            return { 
                ...state, 
                status:"addNoteFailed", 
                loading:false,
                error: action.payload.error
            };
        case DELETE_NOTE_STARTED: 
            return {
                ...state,
                status:'deletindNote',
                loading:true  
            }
        case DELETE_NOTE_SUCCESS: 
            return {
                ...state,
                status:"deleteNoteSucceeded",
                loading:false,
                notes: state.notes.concat(action.payload)
            }
        case DELETE_NOTE_FAIL:
            return { 
                ...state, 
                status:"deleteNoteFailed", 
                loading:false,
                error: action.payload.error
            };
        case FIND_NOTE_STARTED: 
            return {
                ...state,
                status:"findingNote",
                loading:true
        }
        case FIND_NOTE_SUCCESS: 
            return {
                ...state,
                status:"findNoteSucceeded",
                loading:false,
                notes: state.notes.concat(action.payload)
            }
        case FIND_NOTE_FAIL:
            return { 
                ...state, 
                status:"findNoteFailed", 
                loading:false,
                error: action.payload.error
            };
        case UPDATE_NOTE_TEXT_STARTED: 
            return {
                ...state,
                status:"updatingNoteText",
                loading:true

        }
        case UPDATE_NOTE_TEXT_SUCCESS: 
            return {
                ...state,
                status:"updateNoteTextSucceeded",
                loading:false,
                // notes: state.notes.concat(action.payload)
            }
        case UPDATE_NOTE_TEXT_FAIL:
            return { 
                ...state, 
                status:"updateNoteTextFailed",
                loading:false,
                error: action.payload.error
            };
      default: {
        return state;
      }
    }
};
