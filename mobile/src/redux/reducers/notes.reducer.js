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
} from '../constants';
const initialState = {status:"inactive", error:null, notes: []};
export default function noteReducer(state = initialState, action){
    switch (action.type) {
        case GET_NOTES_STARTED:
            return {
              ...state, 
              status:"loading"
            };
        case GET_NOTES_SUCCESS:
            return { 
                ...state, 
                status:"succeeded", 
                notes: action.payload,
                error:null
              };
        case GET_NOTES_FAIL:
            return { 
                ...state, 
                status:"failed", 
                error: action.payload.error 
            };
        case ADD_NOTE_STARTED: 
            return {
                ...state
                
        }
        case ADD_NOTE_SUCCESS: 
            return {
                ...state,
                notes: state.notes.concat(action.payload),
                status:"inactive"
            }
        case ADD_NOTE_FAIL:
            return { 
                ...state, 
                error: action.payload.error,
                status:"failed", 
            };
        case DELETE_NOTE_STARTED: 
            return {
                ...state,
            }
        case DELETE_NOTE_SUCCESS: 
            return {
                ...state,
                status:"inactive"
            }
        case DELETE_NOTE_FAIL:
            return { 
                ...state, 
                error: action.payload.error,
                status:"failed"
            };
        case FIND_NOTE_STARTED: 
            return {
                ...state
        }
        case FIND_NOTE_SUCCESS: 
            return {
                ...state,
                notes: state.notes.concat(action.payload),
                status:"inactive"
            }
        case FIND_NOTE_FAIL:
            return { 
                ...state, 
                error: action.payload.error,
                status:"failed"
            };
        case UPDATE_NOTE_TEXT_STARTED: 
            return {
                ...state
        }
        case UPDATE_NOTE_TEXT_SUCCESS: 
            return {
                ...state,
                notes: state.notes.concat(action.payload)
            }
        case UPDATE_NOTE_TEXT_FAIL:
            return { 
                ...state, 
                error: action.payload.error 
            };
      default: {
        return state;
      }
    }
};
