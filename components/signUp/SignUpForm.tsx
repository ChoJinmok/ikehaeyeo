import { memo } from 'react';

import SignUpField from './SignUpField';

import { SignUpFields } from '../../store/modules/signUpSlice';
import SIGN_UP_FIELDS from '../../fixtures/signUpFields';
import { HandleChange } from './type';

interface SignUpFormProps {
  signUpFields: SignUpFields;
  onChange: HandleChange;
  isMouseOver: boolean;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

function SignUpForm({
  signUpFields, onChange, isMouseOver, onMouseOver, onMouseLeave,
}: SignUpFormProps) {
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
            isMouseOver={isMouseOver}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          />
        );
      })}
    </form>
  );
}

export default memo(SignUpForm);
