import { useState } from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import SignUpContainer from '../../components/signUp/SignUpContainer';

import SIGN_UP_FIELDS from '../../fixtures/signUpFields';

import type { SignUpState } from '../../store/modules/signUpSlice';

jest.mock('react-redux');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const mockedUseState = useState as jest.Mock;
const mockedUseDispatch = useDispatch as jest.Mock<typeof useDispatch>;
const mockedUseSelector = useSelector as jest.Mock<typeof useSelector>;

describe('SignUpContainer', () => {
  given('useStateInitialState', () => ({
    isMouseOverBirthDateToolTip: given.isMouseOverBirthDateToolTip ?? false,
    isPasswordVisible: given.isPasswordVisible ?? false,
  }));

  const setState = jest.fn();
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
    setState.mockClear();
    dispatch.mockClear();

    mockedUseState.mockImplementation(
      () => [given.useStateInitialState, setState],
    );

    mockedUseDispatch.mockImplementation(() => dispatch);

    mockedUseSelector.mockImplementation((selector) => selector({
      signUp: signUpState,
    }));
  });

  it('renders sign up form', () => {
    const { signUpFields } = signUpState;

    const { queryByLabelText } = render(<SignUpContainer />);

    SIGN_UP_FIELDS.forEach(
      ({ name, label, required }) => {
        function makeLabel() {
          if (required === undefined || required) return label;

          return `${label} (선택 사항)`;
        }

        const signUpInput = queryByLabelText(makeLabel());

        expect(signUpInput).not.toBeNull();
        expect(signUpInput).toHaveValue(signUpFields[name]);
      },
    );
  });

  it('listens change controller events', () => {
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

  context('when mouse is over birth date tooltip', () => {
    given('isMouseOverBirthDateToolTip', () => true);

    it('renders birth date tooltip text', () => {
      const { getByText } = render(<SignUpContainer />);

      expect(getByText(/14세/)).toBeVisible();
    });
  });

  context('when mouse is not over birth date tooltip', () => {
    it('renders birth date tooltip text', () => {
      const { getByText } = render(<SignUpContainer />);

      expect(getByText(/14세/)).not.toBeVisible();
    });
  });

  it('listens mouse over birth date tool tip event', () => {
    const { getByTestId } = render(<SignUpContainer />);

    fireEvent.mouseOver((getByTestId('birth-date-tooltip-icon')));

    expect(setState).toBeCalledWith({
      ...given.useStateInitialState,
      isMouseOverBirthDateToolTip: true,
    });
  });

  it('listens mouse leave birth date tool tip event', () => {
    const { getByTestId } = render(<SignUpContainer />);

    fireEvent.mouseLeave((getByTestId('birth-date-tooltip-wrap')));

    expect(setState).toBeCalledWith({
      ...given.useStateInitialState,
      isMouseOverBirthDateToolTip: false,
    });
  });

  context('when password is \'not\' visible', () => {
    it('renders showing password button', () => {
      const { queryByText } = render(<SignUpContainer />);

      expect(queryByText('비밀번호 표시하기')).not.toBeNull();
    });
  });

  context('when password is visible', () => {
    given('isPasswordVisible', () => true);

    it('renders hiding password button', () => {
      const { queryByText } = render(<SignUpContainer />);

      expect(queryByText('비밀번호 숨기기')).not.toBeNull();
    });
  });

  it('listens to click password visible toggle button', () => {
    const { isPasswordVisible } = given.useStateInitialState;

    const { getByText } = render(<SignUpContainer />);

    fireEvent.click(getByText('비밀번호 표시하기'));

    expect(setState).toBeCalledWith({
      ...given.useStateInitialState,
      isPasswordVisible: !isPasswordVisible,
    });
  });
});
