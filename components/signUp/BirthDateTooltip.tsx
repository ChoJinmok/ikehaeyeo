import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

interface BirthDateTooltipProps {
  isMouseOver: boolean;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

export default function BirthDateTooltip(
  { isMouseOver, onMouseOver, onMouseLeave }: BirthDateTooltipProps,
) {
  return (
    <span
      aria-describedby="birth-date-tooltip"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseLeave={onMouseLeave}
      onBlur={onMouseLeave}
      data-testid="birth-date-tooltip-wrap"
    >
      <FontAwesomeIcon
        title="birth-date-tooltip"
        icon={faCircleInfo}
        aria-hidden="true"
      />
      {isMouseOver && (
        <span
          role="tooltip"
          id="birth-date-tooltip"
        >
          만 14세 이상만 가입할 수 있습니다.
        </span>
      )}
    </span>
  );
}
