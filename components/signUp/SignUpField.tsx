import BirthDateTooltip from './BirthDateTooltip';
import SignUpFieldController from './SignUpFieldController';

import { SignUpField as SignUpFieldType } from '../../fixtures/signUpFields';
import { HandleChange, ValueOfSignUpFields } from './type';

interface SignUpInputProps {
  field: SignUpFieldType;
  value: ValueOfSignUpFields;
  onChange: HandleChange;
  isMouseOver: boolean;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

export default function SignUpField(
  {
    field: { name, label, type },
    value,
    onChange,
    isMouseOver,
    onMouseOver,
    onMouseLeave,
  }: SignUpInputProps,
) {
  const id = `signUp-${name}`;

  return (
    <div>

      {name === 'birthDate' && (
        <BirthDateTooltip
          isMouseOver={isMouseOver}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        />
      )}

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
