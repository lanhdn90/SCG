import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { LinesOfUser } from '../../models';

export interface UserState {
  loading: boolean;
  linesOfUser?: Array<LinesOfUser[]>;
  error?: string;
}

const initialState: UserState = {
  loading: false,
  linesOfUser: undefined,
  error: undefined,
};

const homeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserInfo(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchUserInfoSuccess(state, action: PayloadAction<Array<LinesOfUser[]>>) {
      state.loading = false;
      state.linesOfUser = action.payload;
    },
    fetchUserInfoFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const homeActions = homeSlice.actions;

export const selectUserError = (state: RootState) => state.homeReducer.error;
export const selectLoading = (state: RootState) => state.homeReducer.loading;
export const selectLinesOfUser = (state: RootState) => state.homeReducer.linesOfUser;

const homeReducer = homeSlice.reducer;
export default homeReducer;
