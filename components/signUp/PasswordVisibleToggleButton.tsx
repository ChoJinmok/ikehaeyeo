import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

interface PasswordVisibleToggleButtonProps {
  isPasswordVisible: boolean;
  onClick: () => void
}

export default function PasswordVisibleToggleButton({
  isPasswordVisible, onClick,
}: PasswordVisibleToggleButtonProps) {
  const buttonLabelId = isPasswordVisible ? 'hide-password' : 'show-password';
  const buttonLabel = isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 표시하기';
  const buttonIcon = isPasswordVisible ? faEyeSlash : faEye;
  const iconTestId = `${buttonLabelId}-icon`;

  return (
    <button
      type="button"
      aria-labelledby={buttonLabelId}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={buttonIcon}
        aria-hidden="true"
        data-testid={iconTestId}
      />
      <span
        id={buttonLabelId}
        hidden
      >
        {buttonLabel}
      </span>
    </button>
  );
}
