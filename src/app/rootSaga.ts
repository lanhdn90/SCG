import homeSaga from 'components/Layout/homeSaga';
import authSaga from 'features/Login/authSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), homeSaga()]);
}
