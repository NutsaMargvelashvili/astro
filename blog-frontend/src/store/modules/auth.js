import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import { Storage } from 'lib/storage';

// Action Types
const LOGIN = 'auth/LOGIN';
const SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN';
const LOGOUT = 'auth/LOGOUT';
const GET_USER = 'auth/GET_USER';
const REGISTER = 'auth/REGISTER'; // New action for register

// Action Creators
export const login = createAction(LOGIN, api.login);
export const socialLogin = createAction(SOCIAL_LOGIN);
export const logout = createAction(LOGOUT);
export const getUser = createAction(GET_USER, api.getUser);
export const register = createAction(REGISTER, api.registerUser); // New register action

// Initial State
const initialState = Map({
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false,
  currentUser: Map({})
});

// Helper Function to Store Token
const storeAuthToken = (bearerToken) => {
  const jwt = bearerToken.slice(7); // Strip 'Bearer '
  const rememberMe = false; // Assuming false; adjust if needed
  if (rememberMe) {
    Storage.local.set("__AUTH__", jwt);
  } else {
    Storage.session.set("__AUTH__", jwt);
  }
};

// Reducer
export default handleActions({
  [LOGOUT]: (state) => {
    console.log("LOGOUT action");

    Storage.local.remove("__AUTH__");
    Storage.session.remove("__AUTH__");

    return state.set('isAuthenticated', false)
        .set('loginSuccess', false)
        .set('currentUser', Map({}));
  },

  [SOCIAL_LOGIN]: (state, action) => {
    console.log("SOCIAL LOGIN onSuccess");

    storeAuthToken(action.payload);

    return state.set('isAuthenticated', true);
  },

  ...pender({
    type: LOGIN,
    onSuccess: (state, action) => {
      console.log("LOGIN onSuccess");

      const { token: bearerToken } = action.payload.data;
      if (bearerToken && bearerToken.startsWith('Bearer ')) {
        storeAuthToken(bearerToken);
      }

      return state.set('isAuthenticated', true);
    },
    onFailure: (state) => {
      console.log("LOGIN onFailure");
      return state.set('isAuthenticated', false)
          .set('loginError', true);
    }
  }),

  ...pender({
    type: REGISTER, // Handle register
    onSuccess: (state, action) => {
      console.log("REGISTER onSuccess");

      const { token: bearerToken } = action.payload.data;
      if (bearerToken && bearerToken.startsWith('Bearer ')) {
        storeAuthToken(bearerToken);
      }

      return state.set('isAuthenticated', true);
    },
    onFailure: (state) => {
      console.log("REGISTER onFailure");
      return state.set('isAuthenticated', false);
    }
  }),

  ...pender({
    type: GET_USER,
    onSuccess: (state, action) => {
      console.log("GET_USER onSuccess");

      return state.set('isAuthenticated', true)
          .set('currentUser', fromJS(action.payload.data));
    },
    onFailure: (state) => {
      console.log("GET_USER onFailure");
      return state.set('isAuthenticated', false)
          .set('currentUser', Map({}));
    }
  })

}, initialState);
