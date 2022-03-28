import { call, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authActions } from 'features/Login/authSlice';
import { LinesOfUser } from 'models';
import { takeLatest } from 'redux-saga/effects';
import { authApi } from './../../api/authApi';
import { homeActions } from './homeSlice';
function* fetchUserInfoSaga(action: PayloadAction<string>) {
  try {
    const response: Array<LinesOfUser[]> = yield call(authApi.getUserInfo, action.payload);
    yield put(homeActions.fetchUserInfoSuccess(response));
  } catch (error) {
    yield put(authActions.loginFailed('fetch User info failed'));
  }
}

export default function* homeSaga() {
  yield takeLatest(homeActions.fetchUserInfo.type, fetchUserInfoSaga);
}
