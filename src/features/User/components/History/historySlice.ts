import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { historyInfo, ListParams, ListResponse } from "models";

export interface HistoryState {
  fetchStatus: boolean;
  historyList?: ListResponse<historyInfo>;
  error?: string;
}

const initialState: HistoryState = {
  fetchStatus: false,
  historyList: undefined,
  error: undefined,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    fetchHistoryList(state, action: PayloadAction<ListParams>) {
      state.fetchStatus = true;
      state.error = "";
    },
    fetchHistoryListSuccess(state, action: PayloadAction<ListResponse<historyInfo>>) {
      state.fetchStatus = false;
      state.historyList = action.payload;
    },
    fetchHistoryListFailed(state, action: PayloadAction<string>) {
      state.fetchStatus = false;
      state.error = action.payload;
    },
  },
});

export const historyActions = historySlice.actions;

export const selectHistoryList = (state: any) => state.historyReducer.historyList;
// export const selectLogging = (state: any) => state.history.logging;
// export const selectError = (state: any) => state.history.error;

const historyReducer = historySlice.reducer;
export default historyReducer;
