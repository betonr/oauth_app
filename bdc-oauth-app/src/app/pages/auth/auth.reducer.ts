import { createReducer, on, Action } from '@ngrx/store';
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
const reducerAuth = createReducer(initialState,
  on(Login, (state, payload) => {
    localStorage.setItem('user', JSON.stringify(payload));
    const expiredSeconds = (new Date(payload['expired_date']).getTime() - new Date().getTime()) / 1000;
    document.cookie = `oauth.dpi.inpe.br=${payload['token'].toString()}; Domain=.inpe.br; max-age=${expiredSeconds}"; path=/`;
    return { 
      ...state,
      userId: payload['userId'].toString(),
      grants: payload['grants'].toString(),
      token: payload['token'].toString()
    };
  }),
  on(Logout, (state) => {
    localStorage.removeItem('user');
    document.cookie = `oauth.dpi.inpe.br=''; Domain=.inpe.br; max-age=0; path=/`;
    return { ...state, userId: '', token: '', grants: '' };
  })
);

export function reducer(state: AuthState | undefined, action: Action) {
  return reducerAuth(state, action);
}
