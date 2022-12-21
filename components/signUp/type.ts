import { SignUpFields } from '../../store/modules/signUpSlice';

export interface HandleChangeControllerParameter {
  name: keyof SignUpFields;
  value: string;
}

export type HandleChangeController = ({ name, value }: HandleChangeControllerParameter) => void;

export type ValueOfSignUpFields = SignUpFields[keyof SignUpFields];
