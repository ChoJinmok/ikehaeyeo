import { render } from '@testing-library/react';

import SignUp from '../../pages/signup/index';

import SIGN_UP_INPUT_NAMES from '../../fixtures/signUpInputNames';

describe('SignUp', () => {
  it('renders title', () => {
    const { container } = render(<SignUp />);

    expect(container).toHaveTextContent('IKEHAETEO Family 회원 가입');
  });

  it('renders sign up inputs', () => {
    const { queryByLabelText } = render(<SignUp />);

    SIGN_UP_INPUT_NAMES.forEach((inputName) => {
      const signUpInput = queryByLabelText(inputName);

      expect(signUpInput).not.toBeNull();
    });
  });
});
