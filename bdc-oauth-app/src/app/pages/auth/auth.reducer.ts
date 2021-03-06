import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import {
  Login, Logout
} from './auth.action';

/** initial values to Auth State */
const initialState: AuthState = {
  userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['userId'] : '',
  grants: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['grants'] : '',
  token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['token'] : ''
};

/**
 * reducer to manage Auth state
 * set new values in AuthState
 */
export const reducer = createReducer(initialState,
  on(Login, (state, payload) => {
    localStorage.setItem('user', JSON.stringify(payload));
    return { 
      ...state,
      userId: payload['userId'].toString(),
      grants: payload['grants'].toString(),
      token: payload['token'].toString()
    };
  }),
  on(Logout, (state) => {
    localStorage.removeItem('user');
    return { ...state, userId: '', token: '', grants: '' };
  })
);
