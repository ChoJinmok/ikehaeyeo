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
    const { queryByText } = renderBirthDateTooltip();

    expect(queryByText('birth-date-tooltip')).not.toBeNull();
  });

  context('when birth date tooltip icon is active', () => {
    it('renders birth date tooltip icon', () => {
      const { queryByText } = renderBirthDateTooltip();

      expect(queryByText(/14세/)).toBeNull();
    });

    it('listens to mouse over event', () => {
      const { getByText } = renderBirthDateTooltip();

      fireEvent.mouseOver(getByText('birth-date-tooltip'));

      expect(handleMouseOver).toBeCalled();
    });

    it('listens to focus in event', () => {
      const { getByText } = renderBirthDateTooltip();

      fireEvent.focusIn(getByText('birth-date-tooltip'));

      expect(handleMouseOver).toBeCalled();
    });
  });

  context('when birth date tooltip icon is active', () => {
    it('renders birth date tooltip information', () => {
      const { queryByText } = renderBirthDateTooltip(true);

      expect(queryByText(/14세/)).not.toBeNull();
    });

    it('listens to mouse leave event', () => {
      const { getByTestId } = renderBirthDateTooltip();

      fireEvent.mouseLeave(getByTestId('birth-date-tooltip-wrap'));

      expect(handleMouseLeave).toBeCalled();
    });

    it('listens to blur event', () => {
      const { getByTestId } = renderBirthDateTooltip();

      fireEvent.blur(getByTestId('birth-date-tooltip-wrap'));

      expect(handleMouseLeave).toBeCalled();
    });
  });
});
