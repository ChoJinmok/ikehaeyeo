import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

interface BirthDateTooltipProps {
  isMouseOver: boolean;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

interface BirthDateTooltipTextProps {
  isMouseOver: boolean;
}

const BirthDateTooltipText = styled.span<BirthDateTooltipTextProps>(
  ({ isMouseOver }) => ({
    visibility: isMouseOver ? 'visible' : 'hidden',
    hidden: isMouseOver ? 1 : 0,
  }),
);

export default function BirthDateTooltip(
  { isMouseOver, onMouseOver, onMouseLeave }: BirthDateTooltipProps,
) {
  return (
    <span
      aria-describedby="birth-date-tooltip"
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseLeave={onMouseLeave}
      onBlur={onMouseLeave}
      data-testid="birth-date-tooltip-wrap"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      <FontAwesomeIcon
        icon={faCircleInfo}
        aria-hidden="true"
        data-testid="birth-date-tooltip-icon"
      />
      <BirthDateTooltipText
        role="tooltip"
        id="birth-date-tooltip"
        isMouseOver={isMouseOver}
      >
        만 14세 이상만 가입할 수 있습니다.
      </BirthDateTooltipText>
    </span>
  );
}
