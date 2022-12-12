import SignUpFieldController from './SignUpFieldController';

import { SignUpField as SignUpFieldType } from '../../fixtures/signUpFields';
import { HandleChange, ValueOfSignUpFields } from './type';

interface SignUpInputProps {
  field: SignUpFieldType;
  value: ValueOfSignUpFields;
  onChange: HandleChange;
}

export default function SignUpField(
  {
    field: { name, label, type },
    value,
    onChange,
  }: SignUpInputProps,
) {
  const id = `signUp-${name}`;

  return (
    <div>
      {name === 'phoneNumber' && <span>KR (+82)</span>}
      <label htmlFor={id}>
        {label}
      </label>
      <SignUpFieldController
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
