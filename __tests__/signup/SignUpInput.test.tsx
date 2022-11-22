import { render } from '@testing-library/react';

import SignUpInput from '../../components/signup/SignUpInput';

import SIGN_UP_INPUT_NAMES from '../../fixtures/signUpInputNames';

describe('SignUpInput', () => {
  SIGN_UP_INPUT_NAMES.forEach((inputName) => {
    it('renders label and input control', () => {
      const { queryByLabelText } = render(
        <SignUpInput
          name={inputName}
        />,
      );

      expect(queryByLabelText(inputName)).not.toBeNull();
    });
  });
});
