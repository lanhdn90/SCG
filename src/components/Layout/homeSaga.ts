import { call, put } from '@redux-saga/core/effects';
import { authActions } from 'features/Login/authSlice';
import { UserInfo } from 'models';
import { takeLatest } from 'redux-saga/effects';
import { authApi } from './../../api/authApi';
import { homeActions } from './homeSlice';
function* fetchUserInfoSaga() {
  try {
    const response: UserInfo = yield call(authApi.getUserInfo);
    yield put(homeActions.fetchUserInfoSuccess(response));
  } catch (error) {
    yield put(authActions.loginFailed('fetch User info failed'));
  }
}

export default function* homeSaga() {
  yield takeLatest(homeActions.fetchUserInfo.type, fetchUserInfoSaga);
}
