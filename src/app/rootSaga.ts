import homeSaga from "components/Layout/homeSaga";
import authSaga from "features/Login/authSaga";
import historySaga from "features/User/components/History/historySaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([authSaga(), homeSaga(), historySaga()]);
}
