import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import BirthDateTooltip from './BirthDateTooltip';
import SignUpFieldController from './SignUpFieldController';
import PasswordVisibleToggleButton from './PasswordVisibleToggleButton';

import type { SignUpField } from '../../fixtures/signUpFields';
import type { HandleChangeController, ValueOfSignUpFields } from './type';

interface SignUpInputProps {
  field: SignUpField;
  value: ValueOfSignUpFields;
  onChangeController: HandleChangeController;
  isMouseOverBirthDateToolTip: boolean;
  onMouseOverBirthDateToolTip: () => void;
  onMouseLeaveBirthDateToolTip: () => void;
}

export default function SignUpField(
  {
    field: {
      name, label, type, placeholder,
    },
    value,
    onChangeController,
    isMouseOverBirthDateToolTip,
    onMouseOverBirthDateToolTip,
    onMouseLeaveBirthDateToolTip,
  }: SignUpInputProps,
) {
  const id = `signUp-${name}`;

  return (
    <div>

      {name === 'birthDate' && (
        <BirthDateTooltip
          isMouseOver={isMouseOverBirthDateToolTip}
          onMouseOver={onMouseOverBirthDateToolTip}
          onMouseLeave={onMouseLeaveBirthDateToolTip}
        />
      )}

      {name === 'phoneNumber' && <span>KR (+82)</span>}

      {name === 'gender' && (
        <FontAwesomeIcon
          icon={faChevronDown}
          aria-hidden="true"
          data-testid="chevron-down-icon"
        />
      )}

      {name === 'password' && (
        <PasswordVisibleToggleButton />
      )}

      <label htmlFor={id}>
        {label}
      </label>
      <SignUpFieldController
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeController}
      />
    </div>
  );
}
