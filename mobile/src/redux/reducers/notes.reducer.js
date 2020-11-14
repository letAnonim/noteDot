
// import { ADDNOTE, DELETENOTE } from '../constants';
// const initialState = {
//     notes: [],
//   };
//   // Reducers (Modifies The State And Returns A New State)
//   const noteReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case ADDNOTE: {
//         return {
//           ...state,
//           notes: state.notes.concat({
//             title: title,
//             color: color,
//             ovner: aUser._id,
//             text: '',
//             connectedUsers: [aUser._id],
//           })
//         }
//       }
//       case DELETENOTE: {
//         return {
//           ...state,
//           notes: state.notes.filter((item)=>{
//             item.title != key
//           }),
//         }
//       }
//       default: {
//         return state;
//       }
//     }
//   };
// export default noteReducer;

// // export const rootReducer =  combineReducers({
// //     counter: countReducer,
// //     // theme: themeReducer
// // })