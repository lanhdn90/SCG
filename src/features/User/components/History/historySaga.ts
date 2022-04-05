import { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "api/authApi";
import { historyInfo, ListParams, ListResponse } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { historyActions } from "./historySlice";

function* fetchHistoryListSaga(action: PayloadAction<ListParams>) {
  try {
    const res: ListResponse<historyInfo> = yield call(
      authApi.fetchHistoryOfLine,
      action.payload
    );
    const newData: Array<historyInfo> = res.data.map(
      (item: historyInfo, index: number) => ({
        ...item,
        key: index + 1,
      })
    );
    yield put(
      historyActions.fetchHistoryListSuccess({ ...res, data: newData })
    );
  } catch (error: any) {
    yield put(
      historyActions.fetchHistoryListFailed("Wrong Username or password")
    );
  }
}

export default function* historySaga() {
  yield takeLatest(historyActions.fetchHistoryList, fetchHistoryListSaga);
}
