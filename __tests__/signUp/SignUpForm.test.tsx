import { render, fireEvent } from '@testing-library/react';

import SignUpForm from '../../components/signUp/SignUpForm';

import SIGN_UP_FIELDS from '../../fixtures/signUpFields';
import { initialState } from '../../store/modules/signUpSlice';

describe('SignUpForm', () => {
  const handleChangeController = jest.fn();
  const handleMouseOverBirthDateToolTip = jest.fn();
  const handleMouseLeaveBirthDateToolTip = jest.fn();
  const handleClickPasswordVisibleToggleButton = jest.fn();

  const { signUpFields } = initialState;

  interface RenderSignUpFormParams {
    isMouseOverBirthDateToolTip?: boolean;
    isPasswordVisible?: boolean;
  }

  function renderSignUpForm({
    isMouseOverBirthDateToolTip = false,
    isPasswordVisible = false,
  }: RenderSignUpFormParams = {}) {
    return render(
      <SignUpForm
        signUpFields={signUpFields}
        onChangeController={handleChangeController}
        isMouseOverBirthDateToolTip={isMouseOverBirthDateToolTip}
        onMouseOverBirthDateToolTip={handleMouseOverBirthDateToolTip}
        onMouseLeaveBirthDateToolTip={handleMouseLeaveBirthDateToolTip}
        isPasswordVisible={isPasswordVisible}
        onClickPasswordVisibleToggleButton={handleClickPasswordVisibleToggleButton}
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
      ({ name, label, required }) => {
        function makeLabel() {
          if (typeof required === 'undefined' || required) return label;

          return `${label} (선택 사항)`;
        }

        const signUpController = queryByLabelText(makeLabel());

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

  context('when mouse is over birth date tooltip', () => {
    const isMouseOverBirthDateToolTip = true;

    it('renders birth date tooltip text', () => {
      const { getByText } = renderSignUpForm({ isMouseOverBirthDateToolTip });

      expect(getByText(/14세/)).toBeVisible();
    });
  });

  context('when mouse is not over birth date tooltip', () => {
    it('renders birth date tooltip text', () => {
      const { getByText } = renderSignUpForm();

      expect(getByText(/14세/)).not.toBeVisible();
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

  context('when password is \'not\' visible', () => {
    it('renders showing password button', () => {
      const { queryByText } = renderSignUpForm();

      expect(queryByText('비밀번호 표시하기')).not.toBeNull();
    });
  });

  context('when password is visible', () => {
    const isPasswordVisible = true;

    it('renders hiding password button', () => {
      const { queryByText } = renderSignUpForm({ isPasswordVisible });

      expect(queryByText('비밀번호 숨기기')).not.toBeNull();
    });
  });

  it('listens to click password visible toggle button', () => {
    const { getByText } = renderSignUpForm();

    fireEvent.click(getByText('비밀번호 표시하기'));

    expect(handleClickPasswordVisibleToggleButton).toBeCalled();
  });
});
