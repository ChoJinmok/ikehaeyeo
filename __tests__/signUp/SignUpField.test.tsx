import { render, fireEvent } from '@testing-library/react';

import SignUpField from '../../components/signUp/SignUpField';

import signUpFields from '../../fixtures/signUpFields';
import genderOptions from '../../fixtures/genderOptions';

describe('SignUpInput', () => {
  const handleChange = jest.fn();

  const defaultSignUpField = signUpFields[0];

  function renderSignUpField({ field = defaultSignUpField, value = '' } = {}) {
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

  it('renders label and field\'s control', () => {
    const { label } = defaultSignUpField;

    const { queryByLabelText } = renderSignUpField();

    expect(queryByLabelText(label)).not.toBeNull();
    expect(queryByLabelText(label)).toContainHTML('type="text"');
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
    const targetValue = 'test';
    const { label } = defaultSignUpField;

    const { getByLabelText } = renderSignUpField({ value: targetValue });

    expect(getByLabelText(label)).toHaveValue(targetValue);
  });

  context('when \'phone number\' field renders', () => {
    const phoneNumberField = signUpFields.find(
      ({ name }) => name === 'phoneNumber',
    );

    it('renders \'KR (+82)\'', () => {
      const { queryByText } = renderSignUpField({ field: phoneNumberField });

      expect(queryByText('KR (+82)')).not.toBeNull();
    });
  });

  context('when \'gender\' field renders', () => {
    const genderField = signUpFields.find(
      ({ name }) => name === 'gender',
    );

    it('renders gender selector', () => {
      const { getByLabelText, getByText } = renderSignUpField({ field: genderField });

      const genderSelector = getByLabelText(genderField?.label ?? /성별/);

      expect(genderSelector.firstChild).toBeEmptyDOMElement();

      genderOptions.forEach((({ text: gender }) => {
        expect(genderSelector).toContainElement(getByText(gender));
      }));
    });
  });
});
