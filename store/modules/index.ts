import {
  combineReducers, AnyAction,
} from '@reduxjs/toolkit';

import { HYDRATE } from 'next-redux-wrapper';

import signUpSlice, { SignUpState } from './signUpSlice';

export interface ReducerStates {
  signUp: SignUpState
}

const reducer = (state: ReducerStates, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducers({
    signUp: signUpSlice,
  })(state, action);
};

export default reducer;
