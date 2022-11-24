import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import SignUp from '../../pages/signup/index';

import SIGN_UP_INPUT_NAMES from '../../fixtures/signUpInputNames';

jest.mock('react-redux');

const mockedUseSelector = useSelector as jest.Mock<typeof useSelector>;

describe('SignUp', () => {
  beforeEach(() => {
    mockedUseSelector.mockImplementation((selector) => selector({
      signUp: {
        signUpFields: {
          name: '',
          phoneNumber: '',
          gender: '',
          streetNameAddress: '',
          detailedAddress: '',
          zipCode: '',
          email: '',
          password: '',
        },
      },
    }));
  });

  it('renders title', () => {
    const { container } = render(<SignUp />);

    expect(container).toHaveTextContent('IKEHAEYEO Family 회원 가입');
  });

  it('renders sign up inputs', () => {
    const { queryByLabelText } = render(<SignUp />);

    SIGN_UP_INPUT_NAMES.forEach((inputName) => {
      const signUpInput = queryByLabelText(inputName);

      expect(signUpInput).not.toBeNull();
    });
  });
});
