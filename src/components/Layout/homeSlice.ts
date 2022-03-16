import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UserInfo } from '../../models';

export interface UserState {
  loading: boolean;
  currentUser?: UserInfo;
  error?: string;
}

const initialState: UserState = {
  loading: false,
  currentUser: undefined,
  error: undefined,
};

const homeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserInfo(state) {
      state.loading = true;
    },
    fetchUserInfoSuccess(state, action: PayloadAction<UserInfo>) {
      state.loading = false;
      state.currentUser = action.payload;
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
export const selectUserInfo = (state: RootState) => state.homeReducer.currentUser;

const homeReducer = homeSlice.reducer;
export default homeReducer;
