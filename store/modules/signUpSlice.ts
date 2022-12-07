import { createSlice } from '@reduxjs/toolkit';

export interface SignUpState {
    signUpFields: { [key: string]: string }
}

export const initialState: SignUpState = {
  signUpFields: {
    name: '',
    birthDate: '',
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
    changeSignUpField(state, { payload: { name, value } }) {
      return {
        ...state,
        signUpFields: {
          ...state.signUpFields,
          [name]: value,
        },
      };
    },
  },
});

export const {
  changeSignUpField,
} = actions;

export default reducer;
