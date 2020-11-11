import {GET_USER, GET_USERS} from '../constants'

export function getUsers() {
  return {
    type: GET_USERS,
    payload: {
      request: {
        url: `/users}`,
      },
    },
  };
}

// export function getUsers(user, notes) {
//   return {
//     type: GET_USERS_NOTES,
//     payload: {
//       request: {
//         url: `/users/${user}/${notes}`,
//       },
//     },
//   };
// }

export function getUser(user) {
  return {
    type: GET_USER,
    payload: {
      request: {
        url: `/users/${user}`,
      },
    },
  };
}
