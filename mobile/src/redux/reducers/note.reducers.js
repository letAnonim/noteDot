import { 
    UPDATE_NOTE_TEXT_STARTED,
    UPDATE_NOTE_TEXT_SUCCESS,
    UPDATE_NOTE_TEXT_FAIL, 
    SET_DEFAULT_NOTE_STATE,
    UPDATE_NOTE_PROPRETIES_STARTED,
    UPDATE_NOTE_PROPRETIES_SUCCESS,
    UPDATE_NOTE_PROPRETIES_FAIL,
} from '../constants';
const initialState = {status:"inactive", loading:false, error:null, note: {}};
export default function noteReducer(state = initialState, action){
    switch (action.type) {
        case SET_DEFAULT_NOTE_STATE:
        return {
            ...state,
            status: initialState.status,
            loading: initialState.loading
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
                note: action.payload
            }
        case UPDATE_NOTE_TEXT_FAIL:
            return { 
                ...state, 
                status:"updateNoteTextFailed",
                loading:false,
                error: action.payload.error
            };
        case UPDATE_NOTE_PROPRETIES_STARTED: 
            return {
                ...state,
                status:"updatingNoteProperties",
                loading:true
            }
        case UPDATE_NOTE_PROPRETIES_SUCCESS: 
            return {
                ...state,
                status:"updateNotePropertiesSucceeded",
                loading:false,
                note: action.payload
            }
        case UPDATE_NOTE_PROPRETIES_FAIL:
            return { 
                ...state, 
                status:"updateNotePropertiesFailed",
                loading:false,
                error: action.payload.error
            };
      default: {
        return state;
      }
    }
};
