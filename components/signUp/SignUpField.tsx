import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import BirthDateTooltip from './BirthDateTooltip';
import SignUpFieldController from './SignUpFieldController';
import PasswordVisibleToggleButton from './PasswordVisibleToggleButton';

import type { SignUpField as SignUpFieldType } from '../../fixtures/signUpFields';
import type { HandleChangeController, ValueOfSignUpFields } from './type';

interface SignUpInputProps {
  field: SignUpFieldType;
  value: ValueOfSignUpFields;
  onChangeController: HandleChangeController;
  isMouseOverBirthDateToolTip: boolean;
  onMouseOverBirthDateToolTip: () => void;
  onMouseLeaveBirthDateToolTip: () => void;
  isPasswordVisible: boolean;
  onClickPasswordVisibleToggleButton:() => void;
}

export default function SignUpField(
  {
    field: {
      name, label, type, placeholder, required = true,
    },
    value,
    onChangeController,
    isMouseOverBirthDateToolTip,
    onMouseOverBirthDateToolTip,
    onMouseLeaveBirthDateToolTip,
    isPasswordVisible,
    onClickPasswordVisibleToggleButton,
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
        <PasswordVisibleToggleButton
          isPasswordVisible={isPasswordVisible}
          onClick={onClickPasswordVisibleToggleButton}
        />
      )}

      <label htmlFor={id}>
        {label}
        {!required && ' (선택 사항)'}
      </label>
      <SignUpFieldController
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChangeController}
        isPasswordVisible={isPasswordVisible}
      />
    </div>
  );
}
