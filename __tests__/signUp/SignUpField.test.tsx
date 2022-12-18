import { render, fireEvent } from '@testing-library/react';

import SignUpField from '../../components/signUp/SignUpField';

import signUpFields, { SignUpField as SignUpFieldType } from '../../fixtures/signUpFields';
import makeSignUpField from '../../utils/makeSignUpField';

import { ValueOfSignUpFields } from '../../components/signUp/type';

describe('SignUpField', () => {
  const handleChange = jest.fn();
  const handleMouseOver = jest.fn();
  const handleMouseLeave = jest.fn();
  const [defaultSignUpField] = signUpFields;

  interface RenderSignUpFieldParams {
    field?: SignUpFieldType;
    value?: ValueOfSignUpFields;
  }

  function renderSignUpField(
    { field = defaultSignUpField, value = '' }
    : RenderSignUpFieldParams = {},
  ) {
    return render(
      <SignUpField
        field={field}
        value={value}
        onChange={handleChange}
        isMouseOver={false}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />,
    );
  }

  beforeEach(() => {
    handleChange.mockClear();
    handleMouseOver.mockClear();
    handleMouseLeave.mockClear();
  });

  context('excluding \'gender\' field', () => {
    it('renders label and field\'s control', () => {
      const { label } = defaultSignUpField;

      const { getByLabelText } = renderSignUpField();

      expect(getByLabelText(label)).toContainHTML('<input');
    });
  });

  context('when birth date field rendering', () => {
    const birthDateField = makeSignUpField('birthDate');

    it('renders information icon', () => {
      const { queryByTestId } = renderSignUpField({ field: birthDateField });

      expect(queryByTestId('birth-date-tooltip-icon')).not.toBeNull();
    });
  });

  context('when type is undefined', () => {
    const { label } = defaultSignUpField;

    it('renders text type input', () => {
      const { getByLabelText } = renderSignUpField();

      expect(getByLabelText(label)).toHaveAttribute('type', 'text');
    });
  });

  context('with type other than \'text\'', () => {
    const passwordField = makeSignUpField('password');

    const { label, type } = passwordField;

    it('renders matched type input', () => {
      const { getByLabelText } = renderSignUpField({ field: passwordField });

      expect(getByLabelText(label)).toHaveAttribute('type', type);
    });
  });

  context('when \'phone number\' field renders', () => {
    const phoneNumberField = makeSignUpField('phoneNumber');

    it('renders \'KR (+82)\' & \'tel\' type input', () => {
      const { queryByText } = renderSignUpField({ field: phoneNumberField });

      expect(queryByText('KR (+82)')).not.toBeNull();
    });
  });

  context('with \'gender\' field', () => {
    it('renders gender field', () => {
      const genderField = makeSignUpField('gender');

      const { getByLabelText } = renderSignUpField({ field: genderField });

      expect(getByLabelText(genderField.label)).toContainHTML('<select');
    });
  });

  it('listens change events', () => {
    const targetValue = 'test';
    const { name, label } = defaultSignUpField;

    const { getByLabelText } = renderSignUpField();

    fireEvent.change(
      getByLabelText(label),
      { target: { value: targetValue } },
    );

    expect(handleChange).toBeCalledWith(
      { name, value: targetValue },
    );
  });

  it('renders input value', () => {
    const value = 'test';
    const { label } = defaultSignUpField;

    const { getByLabelText } = renderSignUpField({ value });

    expect(getByLabelText(label)).toHaveValue(value);
  });

  context('with \'birth date\' field', () => {
    const birthDateField = makeSignUpField('birthDate');

    it('listens to mouse leave event', () => {
      const { getByTestId } = renderSignUpField({ field: birthDateField });

      fireEvent.mouseLeave(getByTestId('birth-date-tooltip-wrap'));

      expect(handleMouseLeave).toBeCalled();
    });

    it('listens to blur event', () => {
      const { getByTestId } = renderSignUpField({ field: birthDateField });

      fireEvent.blur(getByTestId('birth-date-tooltip-wrap'));

      expect(handleMouseLeave).toBeCalled();
    });

    it('listens to mouse over event', () => {
      const { getByTestId } = renderSignUpField({ field: birthDateField });

      fireEvent.mouseOver(getByTestId('birth-date-tooltip-icon'));

      expect(handleMouseOver).toBeCalled();
    });

    it('listens to focus in event', () => {
      const { getByTestId } = renderSignUpField({ field: birthDateField });

      fireEvent.focusIn(getByTestId('birth-date-tooltip-icon'));

      expect(handleMouseOver).toBeCalled();
    });
  });
});
