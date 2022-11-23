import { render } from '@testing-library/react';

import SignUpContainer from '../../components/signUp/SignUpContainer';

import SIGN_UP_INPUT_NAMES from '../../fixtures/signUpInputNames';

describe('SignUpContainer', () => {
  it('renders sign up inputs', () => {
    const { queryByLabelText } = render(<SignUpContainer />);

    SIGN_UP_INPUT_NAMES.forEach((inputName) => {
      const signUpInput = queryByLabelText(inputName);

      expect(signUpInput).not.toBeNull();
    });
  });
});
