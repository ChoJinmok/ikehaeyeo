import { render, fireEvent } from '@testing-library/react';

import PasswordVisibleToggleButton from '../../components/signUp/PasswordVisibleToggleButton';

describe('PasswordVisibleToggleButton', () => {
  const handleClick = jest.fn();

  function renderPasswordVisibleToggleButton(isPasswordVisible = false) {
    return render(
      <PasswordVisibleToggleButton
        isPasswordVisible={isPasswordVisible}
        onClick={handleClick}
      />,
    );
  }

  beforeEach(() => {
    handleClick.mockClear();
  });

  context('when password is hidden', () => {
    it('renders showing password button', () => {
      const { queryByText, queryByTestId } = renderPasswordVisibleToggleButton();

      const eyeIcon = queryByTestId('show-password-icon');

      expect(queryByText('비밀번호 표시하기')).not.toBeNull();
      expect(eyeIcon).not.toBeNull();
    });
  });

  context('when password is visible', () => {
    it('renders hiding password button', () => {
      const { queryByText, queryByTestId } = renderPasswordVisibleToggleButton(true);

      const eyeSlashIcon = queryByTestId('hide-password-icon');

      expect(queryByText('비밀번호 숨기기')).not.toBeNull();
      expect(eyeSlashIcon).not.toBeNull();
    });
  });

  it('listens click events', () => {
    const { getByRole } = renderPasswordVisibleToggleButton();

    fireEvent.click(getByRole('button'));

    expect(handleClick).toBeCalled();
  });
});
