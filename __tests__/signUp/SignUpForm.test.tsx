import { render, fireEvent } from '@testing-library/react';

import SignUpForm from '../../components/signUp/SignUpForm';

import SIGN_UP_FIELDS from '../../fixtures/signUpFields';
import { initialState } from '../../store/modules/signUpSlice';

describe('SignUpForm', () => {
  const handleChangeController = jest.fn();
  const handleMouseOverBirthDateToolTip = jest.fn();
  const handleMouseLeaveBirthDateToolTip = jest.fn();

  const { signUpFields } = initialState;

  function renderSignUpForm(isMouseOverBirthDateToolTip = false) {
    return render(
      <SignUpForm
        signUpFields={signUpFields}
        onChangeController={handleChangeController}
        isMouseOverBirthDateToolTip={isMouseOverBirthDateToolTip}
        onMouseOverBirthDateToolTip={handleMouseOverBirthDateToolTip}
        onMouseLeaveBirthDateToolTip={handleMouseLeaveBirthDateToolTip}
      />,
    );
  }

  beforeEach(() => {
    handleChangeController.mockClear();
    handleMouseOverBirthDateToolTip.mockClear();
    handleMouseLeaveBirthDateToolTip.mockClear();
  });

  it('renders sign up controllers & searching zip code button', () => {
    const { queryByLabelText, queryByText } = renderSignUpForm();

    SIGN_UP_FIELDS.forEach(
      ({ name, label }) => {
        const signUpController = queryByLabelText(label);

        expect(signUpController).not.toBeNull();
        expect(signUpController).toHaveValue(signUpFields[name]);
      },
    );

    const searchingZipCodeButton = queryByText('우편번호 찾기');

    expect(searchingZipCodeButton).not.toBeNull();
  });

  it('listens change controller events', () => {
    const [{ name, label }] = SIGN_UP_FIELDS;
    const targetValue = 'test';

    const { getByLabelText } = renderSignUpForm();

    fireEvent.change(getByLabelText(label), {
      target: { value: targetValue },
    });

    expect(handleChangeController).toBeCalledWith({
      name,
      value: targetValue,
    });
  });

  it('listens to mouse leave birth date tool tip event', () => {
    const { getByTestId } = renderSignUpForm();

    fireEvent.mouseLeave(getByTestId('birth-date-tooltip-wrap'));

    expect(handleMouseLeaveBirthDateToolTip).toBeCalled();
  });

  it('listens to mouse over birth date tool tip event', () => {
    const { getByTestId } = renderSignUpForm();

    fireEvent.mouseOver(getByTestId('birth-date-tooltip-icon'));

    expect(handleMouseOverBirthDateToolTip).toBeCalled();
  });
});
