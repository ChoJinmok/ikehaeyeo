import { render, fireEvent } from '@testing-library/react';

import BirthDateTooltip from '../../components/signUp/BirthDateTooltip';

describe('BirthDateTooltip', () => {
  const handleMouseOver = jest.fn();
  const handleMouseLeave = jest.fn();

  function renderBirthDateTooltip(isMouseOver = false) {
    return render(
      <BirthDateTooltip
        isMouseOver={isMouseOver}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />,
    );
  }

  beforeEach(() => {
    handleMouseOver.mockClear();
    handleMouseLeave.mockClear();
  });

  it('renders birth date tooltip icon', () => {
    const { queryByTestId } = renderBirthDateTooltip();

    expect(queryByTestId('birth-date-tooltip-icon')).not.toBeNull();
  });

  context('when birth date tooltip icon is not active', () => {
    it('renders birth date tooltip icon', () => {
      const { getByText } = renderBirthDateTooltip();

      expect(getByText(/14세/)).not.toBeVisible();
    });

    it('listens to mouse over event', () => {
      const { getByTestId } = renderBirthDateTooltip();

      fireEvent.mouseOver(getByTestId('birth-date-tooltip-icon'));

      expect(handleMouseOver).toBeCalled();
    });

    it('listens to focus in event', () => {
      const { getByTestId } = renderBirthDateTooltip();

      fireEvent.mouseOver(getByTestId('birth-date-tooltip-icon'));

      expect(handleMouseOver).toBeCalled();
    });
  });

  context('when birth date tooltip icon is active', () => {
    it('renders birth date tooltip information', () => {
      const { getByText } = renderBirthDateTooltip(true);

      expect(getByText(/14세/)).toBeVisible();
    });

    it('listens to mouse leave event', () => {
      const { getByTestId } = renderBirthDateTooltip(true);

      fireEvent.mouseLeave(getByTestId('birth-date-tooltip-wrap'));

      expect(handleMouseLeave).toBeCalled();
    });

    it('listens to blur event', () => {
      const { getByTestId } = renderBirthDateTooltip(true);

      fireEvent.blur(getByTestId('birth-date-tooltip-wrap'));

      expect(handleMouseLeave).toBeCalled();
    });
  });
});
