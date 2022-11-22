import {
  configureStore, Reducer, AnyAction, ThunkAction, Action,
} from '@reduxjs/toolkit';

import { createWrapper } from 'next-redux-wrapper';

import rootReducer, { ReducerStates } from './modules';

const makeStore = () => configureStore({
  reducer: rootReducer as Reducer<ReducerStates, AnyAction>,
  devTools: process.env.NODE_ENV === 'development',
});

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});

export type AppStore = ReturnType<typeof makeStore>; // store 타입
export type RootState = ReturnType<typeof rootReducer>; // RootState 타입
export type AppDispatch = AppStore['dispatch']; // dispatch 타입
export type AppThunk<ReturnType = void>
    = ThunkAction<ReturnType, RootState, unknown, Action>; // Thunk 를 위한 타입

export default wrapper;
