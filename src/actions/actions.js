// src/actions/actions.js

export const SET_USER = "SET_USER";
// export const SET_USER_INFO = "SET_USER_INFO";
export const SET_TOKEN = "SET_TOKEN";
export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";

export function setUser(value) {
  return { type: SET_USER, value };
}

// export function setUserInfo(value) {
//   return { type: SET_USER_INFO, value };
// }

export function setToken(value) {
  return { type: SET_TOKEN, value };
}

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}