import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { authApi } from '../../api/authApi';
import { Account,  LoginResponse } from '../../models';
import { authActions } from './authSlice';

function* handleLogin(action: PayloadAction<Account>) {
  try {
    const res: LoginResponse = yield call(authApi.login, action.payload);
    localStorage.setItem('access_token', res.token);
    yield put(authActions.loginSuccess(res));
    yield put(push('/User/Dashboard'));
  } catch (error: any) {
    yield put(authActions.loginFailed('Wrong Username or password'));
  }
}

function* handleLogout() {
  yield localStorage.clear();
  yield put(push('/'));
}

function* watchLoginFlow() {
  yield takeLatest(authActions.login.type, handleLogin);
  yield takeLatest(authActions.logout.type, handleLogout);
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
