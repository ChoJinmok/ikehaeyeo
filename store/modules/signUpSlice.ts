import { createSlice } from '@reduxjs/toolkit';

export interface SignUpState {
    signUpFields: { [key: string]: string }
}

const initialState: SignUpState = {
  signUpFields: {
    name: '',
    phoneNumber: '',
    gender: '',
    streetNameAddress: '',
    detailedAddress: '',
    zipCode: '',
    email: '',
    password: '',
  },
};

const { actions, reducer } = createSlice({
  name: 'signUp',

  initialState,

  reducers: {
    changeSignUpField(state) {
      return {
        ...state,
      };
    },
  },
});

export const {
  changeSignUpField,
} = actions;

export default reducer;
