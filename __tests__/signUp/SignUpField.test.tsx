import { render, fireEvent } from '@testing-library/react';

import SignUpField from '../../components/signUp/SignUpField';

import signUpFields, { SignUpField as SignUpFieldType } from '../../fixtures/signUpFields';
import makeSignUpField from '../../utils/makeSignUpField';

import { ValueOfSignUpFields } from '../../components/signUp/type';

describe('SignUpInput', () => {
  const handleChange = jest.fn();
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
      />,
    );
  }

  beforeEach(() => {
    handleChange.mockClear();
  });

  context('excluding \'gender\' field', () => {
    it('renders label and field\'s control', () => {
      const { label } = defaultSignUpField;

      const { getByLabelText } = renderSignUpField();

      expect(getByLabelText(label)).toContainHTML('<input');
    });
  });

  context('with \'text\' type', () => {
    const { label } = defaultSignUpField;

    it('renders matched type input', () => {
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
});
