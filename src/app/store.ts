import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import homeReducer from 'components/Layout/homeSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/Login/authSlice';
import historyReducer from 'features/User/components/History/historySlice';
import createSagaMiddleware from 'redux-saga';
import { history } from '../utils';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  homeReducer: homeReducer,
  historyReducer: historyReducer
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
