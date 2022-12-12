import signUpFields, { SignUpField } from '../fixtures/signUpFields';

import { SignUpFields } from '../store/modules/signUpSlice';

function makeSignUpField(filedName: keyof SignUpFields, fields = signUpFields) {
  const nonexistentFiled: SignUpField = {
    name: filedName,
    label: 'nonexistent',
  };

  return fields.find(
    ({ name }) => name === filedName,
  ) ?? nonexistentFiled;
}

export default makeSignUpField;
