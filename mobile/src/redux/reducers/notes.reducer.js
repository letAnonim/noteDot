
import { 
    GET_NOTES_STARTED, 
    GET_NOTES_FAIL, 
    GET_NOTES_SUCCESS, 
} from '../constants';
const initialState = {loading: false, notes: [], error:null};
  // Reducers (Modifies The State And Returns A New State)
export default function noteReducer(state = initialState, action){
    switch (action.type) {
        case GET_NOTES_STARTED:
            return {
              ...state, 
              loading: true,
            };
        case GET_NOTES_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                notes: action.payload,
                error:null
              };
        case GET_NOTES_FAIL:
            return { 
                ...state, 
                loading: false, 
                error: action.payload.error 
            };
    //     case ADDNOTE: 
    //         return {
    //             ...state,
    //             notes: state.notes.concat({
    //                 title: title,
    //                 color: color,
    //                 ovner: aUser._id,
    //                 text: '',
    //                 connectedUsers: [aUser._id],
    //         })
    //   }
    //   case DELETENOTE: {
    //     return {
    //       ...state,
    //       notes: state.notes.filter((item)=>{
    //         item.title != key
    //       }),
    //     }
    //   }
    
      default: {
        return state;
      }
    }
};
