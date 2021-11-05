// src/reducers/reducers.js
import { combineReducers } from "redux";

import { SET_USER, SET_TOKEN, SET_MOVIES, SET_FILTER } from "../actions/actions";

function user(state = "", action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function token(state = "", action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function moviesApp(state = {}, action) {
  return {
    user: user(state.user, action),
    token: token(state.token, action),
    movies: movies(state.movies, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
  }
}


export default moviesApp;