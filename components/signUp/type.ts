import { SignUpFields } from '../../store/modules/signUpSlice';

export interface HandleChangeParameter {
  name: keyof SignUpFields;
  value: string;
}

export type HandleChange = ({ name, value }: HandleChangeParameter) => void;

export type ValueOfSignUpFields = SignUpFields[keyof SignUpFields];
