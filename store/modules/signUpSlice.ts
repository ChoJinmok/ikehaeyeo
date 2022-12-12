import { createSlice } from '@reduxjs/toolkit';

export interface SignUpFields {
  name: string;
  birthDate: string;
  phoneNumber: string;
  gender: string;
  streetNameAddress: string;
  detailedAddress: string;
  zipCode: number;
  email: string;
  password: string;
}

export interface SignUpState {
  signUpFields: SignUpFields
}

export const initialState: SignUpState = {
  signUpFields: {
    name: '',
    birthDate: '',
    phoneNumber: '',
    gender: '',
    streetNameAddress: '',
    detailedAddress: '',
    zipCode: 0,
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
