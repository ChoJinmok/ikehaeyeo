import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

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
    field: {
      name, label, type, placeholder,
    },
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

      {name === 'gender' && (
        <FontAwesomeIcon
          icon={faChevronDown}
          aria-hidden="true"
          data-testid="chevron-down-icon"
        />
      )}

      {name === 'password' && (
        <button
          type="button"
          aria-labelledby="show-password"
        >
          <FontAwesomeIcon
            icon={faEye}
            aria-hidden="true"
          />
          <span
            id="show-password"
            hidden
          >
            비밀번호 표시하기
          </span>
        </button>
      )}

      <label htmlFor={id}>
        {label}
      </label>
      <SignUpFieldController
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
