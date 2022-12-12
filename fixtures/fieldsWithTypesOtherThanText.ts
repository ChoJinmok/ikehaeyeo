import { SignUpFields } from '../store/modules/signUpSlice';

const fieldsWithTypesOtherThanText: Array<keyof SignUpFields> = [
  'email', 'password', 'zipCode',
];

export default fieldsWithTypesOtherThanText;
