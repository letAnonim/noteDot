import { 
    UPDATE_NOTE_TEXT_STARTED,
    UPDATE_NOTE_TEXT_SUCCESS,
    UPDATE_NOTE_TEXT_FAIL, 
} from '../constants';
const initialState = {status:"inactive", loading:false, error:null, note: {}};
export default function noteReducer(state = initialState, action){
    switch (action.type) {
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
                note: state.note
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
