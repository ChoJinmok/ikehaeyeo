import { memo } from 'react';

import SignUpField from './SignUpField';

import { SignUpFields } from '../../store/modules/signUpSlice';
import SIGN_UP_FIELDS from '../../fixtures/signUpFields';
import { HandleChangeParameter } from './type';

interface SignUpFormProps {
  signUpFields: SignUpFields;
  onChange: ({ name, value }: HandleChangeParameter) => void;
}

function SignUpForm({ signUpFields, onChange }: SignUpFormProps) {
  return (
    <form>
      {SIGN_UP_FIELDS.map((signUpField) => {
        const { name } = signUpField;

        return (
          <SignUpField
            key={name}
            field={signUpField}
            value={signUpFields[name]}
            onChange={onChange}
          />
        );
      })}
    </form>
  );
}

export default memo(SignUpForm);
