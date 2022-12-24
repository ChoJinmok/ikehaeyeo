import { render, fireEvent } from '@testing-library/react';

import SignUpField from '../../components/signUp/SignUpField';

import signUpFields from '../../fixtures/signUpFields';
import makeSignUpField from '../../utils/makeSignUpField';

import type { SignUpField as SignUpFieldType } from '../../fixtures/signUpFields';
import type { ValueOfSignUpFields } from '../../components/signUp/type';

describe('SignUpField', () => {
  const handleChangeController = jest.fn();
  const handleMouseOverBirthDateToolTip = jest.fn();
  const handleMouseLeaveBirthDateToolTip = jest.fn();
  const handleClickPasswordVisibleToggleButton = jest.fn();
  const [defaultSignUpField] = signUpFields;

  interface RenderSignUpFieldParams {
    field?: SignUpFieldType;
    value?: ValueOfSignUpFields;
    isMouseOverBirthDateToolTip?: boolean;
    isPasswordVisible?: boolean;
  }

  function renderSignUpField(
    {
      field = defaultSignUpField,
      value = '',
      isMouseOverBirthDateToolTip = false,
      isPasswordVisible = false,
    }
    : RenderSignUpFieldParams = {},
  ) {
    return render(
      <SignUpField
        field={field}
        value={value}
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

  it('renders label & controller', () => {
    const { label } = defaultSignUpField;

    const { queryByLabelText } = renderSignUpField();

    expect(queryByLabelText(label)).not.toBeNull();
  });

  it('listens change controller events', () => {
    const targetValue = 'test';
    const { name, label } = defaultSignUpField;

    const { getByLabelText } = renderSignUpField();

    fireEvent.change(
      getByLabelText(label),
      { target: { value: targetValue } },
    );

    expect(handleChangeController).toBeCalledWith(
      { name, value: targetValue },
    );
  });

  it('renders input value', () => {
    const value = 'test';
    const { label } = defaultSignUpField;

    const { getByLabelText } = renderSignUpField({ value });

    expect(getByLabelText(label)).toHaveValue(value);
  });

  it('renders input with placeholder & type', () => {
    const passwordField = makeSignUpField('password');
    const { type, placeholder } = passwordField;

    const { queryByPlaceholderText } = renderSignUpField({ field: passwordField });

    expect(queryByPlaceholderText(placeholder as string)).toHaveAttribute('type', type);
  });

  context('when required attribute is set', () => {
    const genderField = makeSignUpField('gender');
    const { label } = genderField;

    it('renders control of set required attribute', () => {
      const { getByLabelText } = renderSignUpField({ field: genderField });

      expect(getByLabelText(label)).not.toHaveAttribute('required');
    });
  });

  context('when required attribute is not set', () => {
    const { label } = defaultSignUpField;

    it('renders required control', () => {
      const { getByLabelText } = renderSignUpField();

      expect(getByLabelText(label)).toHaveAttribute('required');
    });
  });

  context('with \'birth date\' field', () => {
    const birthDateField = makeSignUpField('birthDate');

    it('renders information icon', () => {
      const { queryByTestId } = renderSignUpField({ field: birthDateField });

      expect(queryByTestId('birth-date-tooltip-icon')).not.toBeNull();
    });

    context('when birth date tooltip icon is not active', () => {
      it('renders birth date tooltip icon', () => {
        const { getByText } = renderSignUpField({ field: birthDateField });

        expect(getByText(/14세/)).not.toBeVisible();
      });

      it('listens to mouse over event', () => {
        const { getByTestId } = renderSignUpField({ field: birthDateField });

        fireEvent.mouseOver(getByTestId('birth-date-tooltip-icon'));

        expect(handleMouseOverBirthDateToolTip).toBeCalled();
      });
    });

    context('when birth date tooltip icon is active', () => {
      const isMouseOverBirthDateToolTip = true;

      it('renders birth date tooltip information', () => {
        const { getByText } = renderSignUpField({
          field: birthDateField,
          isMouseOverBirthDateToolTip,
        });

        expect(getByText(/14세/)).toBeVisible();
      });

      it('listens to mouse leave event', () => {
        const { getByTestId } = renderSignUpField({
          field: birthDateField,
          isMouseOverBirthDateToolTip,
        });

        fireEvent.mouseLeave(getByTestId('birth-date-tooltip-wrap'));

        expect(handleMouseLeaveBirthDateToolTip).toBeCalled();
      });
    });
  });

  context('with \'phone number\' field', () => {
    const phoneNumberField = makeSignUpField('phoneNumber');

    it('renders \'KR (+82)\' text', () => {
      const { queryByText } = renderSignUpField({ field: phoneNumberField });

      expect(queryByText('KR (+82)')).not.toBeNull();
    });
  });

  context('with \'gender\' field', () => {
    const genderField = makeSignUpField('gender');

    it('renders chevron down icon', () => {
      const { queryByTestId } = renderSignUpField({ field: genderField });

      const chevronIcon = queryByTestId('chevron-down-icon');

      expect(chevronIcon).not.toBeNull();
    });
  });

  context('with \'password\' field', () => {
    const passwordField = makeSignUpField('password');
    const { label } = passwordField;

    context('when password is \'not\' visible', () => {
      const { type } = passwordField;
      const buttonLabel = '비밀번호 표시하기';

      it('renders showing password button & \'password\' type input', () => {
        const { queryByText, getByLabelText } = renderSignUpField({ field: passwordField });

        expect(queryByText(buttonLabel)).not.toBeNull();
        expect(getByLabelText(label)).toHaveAttribute('type', type);
      });
    });

    context('when password is visible', () => {
      const isPasswordVisible = true;
      const type = 'text';
      const buttonLabel = '비밀번호 숨기기';

      it('renders hiding password button & \'textbox\'', () => {
        const { queryByText, getByLabelText } = renderSignUpField({
          field: passwordField,
          isPasswordVisible,
        });

        expect(queryByText(buttonLabel)).not.toBeNull();
        expect(getByLabelText(label)).toHaveAttribute('type', type);
      });
    });

    it('listens click event', () => {
      const { getByRole } = renderSignUpField({ field: passwordField });

      fireEvent.click(getByRole('button'));

      expect(handleClickPasswordVisibleToggleButton).toBeCalled();
    });
  });
});
