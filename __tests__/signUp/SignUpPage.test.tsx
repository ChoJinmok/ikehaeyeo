import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import SignUp from '../../pages/signup/index';

import { initialState } from '../../store/modules/signUpSlice';
import SIGN_UP_FIELDS from '../../fixtures/signUpFields';

jest.mock('react-redux');

const mockedUseSelector = useSelector as jest.Mock<typeof useSelector>;

describe('SignUp', () => {
  beforeEach(() => {
    mockedUseSelector.mockImplementation((selector) => selector({
      signUp: initialState,
    }));
  });

  it('renders title', () => {
    const { container } = render(<SignUp />);

    expect(container).toHaveTextContent('IKEHAEYEO Family 회원 가입');
  });

  it('renders sign up fields', () => {
    const { queryByLabelText } = render(<SignUp />);

    SIGN_UP_FIELDS.forEach(({ label }) => {
      const signUpInput = queryByLabelText(label);

      expect(signUpInput).not.toBeNull();
    });
  });
});
