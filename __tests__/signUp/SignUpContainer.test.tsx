import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import SignUpContainer from '../../components/signUp/SignUpContainer';

import SIGN_UP_FIELDS from '../../fixtures/signUpFields';

import { SignUpState } from '../../store/modules/signUpSlice';

jest.mock('react-redux');

const mockedUseDispatch = useDispatch as jest.Mock<typeof useDispatch>;
const mockedUseSelector = useSelector as jest.Mock<typeof useSelector>;

describe('SignUpContainer', () => {
  const dispatch = jest.fn();

  const signUpState: SignUpState = {
    signUpFields: {
      name: 'name',
      birthDate: '1991-11-27',
      phoneNumber: '010',
      gender: 'male',
      streetNameAddress: 'test',
      detailedAddress: 'test',
      zipCode: 1234,
      email: 'test@test',
      password: '1234',
    },
  };

  beforeEach(() => {
    dispatch.mockClear();

    mockedUseDispatch.mockImplementation(() => dispatch);

    mockedUseSelector.mockImplementation((selector) => selector({
      signUp: signUpState,
    }));
  });

  it('renders sign up input controls', () => {
    const { signUpFields } = signUpState;

    const { queryByLabelText } = render(<SignUpContainer />);

    SIGN_UP_FIELDS.forEach(
      ({ name, label }) => {
        const signUpInput = queryByLabelText(label);

        expect(signUpInput).not.toBeNull();
        expect(signUpInput).toHaveValue(signUpFields[name]);
      },
    );
  });

  it('listens change events', () => {
    const { getByLabelText } = render(<SignUpContainer />);

    fireEvent.change(getByLabelText('이름'), {
      target: { value: 'test' },
    });

    expect(dispatch).toBeCalledWith({
      type: 'signUp/changeSignUpField',
      payload: { name: 'name', value: 'test' },
    });
  });
});
