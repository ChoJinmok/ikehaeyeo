import { useState } from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import SignUpContainer from '../../components/signUp/SignUpContainer';

import SIGN_UP_FIELDS from '../../fixtures/signUpFields';

import { SignUpState } from '../../store/modules/signUpSlice';

jest.mock('react-redux');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const mockedUseState = useState as jest.Mock;
const mockedUseDispatch = useDispatch as jest.Mock<typeof useDispatch>;
const mockedUseSelector = useSelector as jest.Mock<typeof useSelector>;

describe('SignUpContainer', () => {
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

  const setState = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    setState.mockClear();
    dispatch.mockClear();

    mockedUseState.mockImplementation(
      (initialState) => [initialState, setState],
    );

    mockedUseDispatch.mockImplementation(() => dispatch);

    mockedUseSelector.mockImplementation((selector) => selector({
      signUp: signUpState,
    }));
  });

  it('renders sign up controls', () => {
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
    const [{ name, label }] = SIGN_UP_FIELDS;
    const targetValue = 'test';

    const { getByLabelText } = render(<SignUpContainer />);

    fireEvent.change(getByLabelText(label), {
      target: { value: targetValue },
    });

    expect(dispatch).toBeCalledWith({
      type: 'signUp/changeSignUpField',
      payload: { name, value: 'test' },
    });
  });

  it('listens mouse over event', () => {
    const { getByTestId } = render(<SignUpContainer />);

    fireEvent.mouseOver((getByTestId('birth-date-tooltip-icon')));

    expect(setState).toBeCalledWith(true);
  });

  it('listens to focus in event', () => {
    const { getByTestId } = render(<SignUpContainer />);

    fireEvent.focusIn(getByTestId('birth-date-tooltip-icon'));

    expect(setState).toBeCalledWith(true);
  });

  it('listens mouse leave event', () => {
    const { getByTestId } = render(<SignUpContainer />);

    fireEvent.mouseLeave((getByTestId('birth-date-tooltip-wrap')));

    expect(setState).toBeCalledWith(false);
  });

  it('listens to blur event', () => {
    const { getByTestId } = render(<SignUpContainer />);

    fireEvent.blur(getByTestId('birth-date-tooltip-wrap'));

    expect(setState).toBeCalledWith(false);
  });
});
