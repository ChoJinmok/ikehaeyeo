import {
  combineReducers, AnyAction,
} from '@reduxjs/toolkit';

import { HYDRATE } from 'next-redux-wrapper';

export interface ReducerStates {
    // TODO: 임시 타입 작성 추후 수정
    [key: string]: string
}

const reducer = (state: ReducerStates, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducers({
    //
  })(state, action);
};

export default reducer;
