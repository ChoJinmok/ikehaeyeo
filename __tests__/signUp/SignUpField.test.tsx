import { render, fireEvent } from '@testing-library/react';

import SignUpField from '../../components/signUp/SignUpField';

import signUpFields, { SignUpField as SignUpFieldType } from '../../fixtures/signUpFields';
import genderOptions from '../../fixtures/genderOptions';

import { SignUpFields } from '../../store/modules/signUpSlice';

function makeSignUpField(signUpFiledName: keyof SignUpFields) {
  const notFoundFiled: SignUpFieldType = {
    name: 'name',
    label: 'error',
  };

  return signUpFields.find(
    ({ name }) => name === signUpFiledName,
  ) ?? notFoundFiled;
}

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

  const fieldsWithTypesOtherThanText: Array<keyof SignUpFields> = [
    'email', 'password', 'zipCode',
  ];

  fieldsWithTypesOtherThanText.forEach((field) => {
    context(`when '${field}' field renders`, () => {
      const currentField = makeSignUpField(field);

      const { label, type } = currentField;

      it(`renders '${field}' type input`, () => {
        const { getByLabelText } = renderSignUpField({ field: currentField });

        expect(getByLabelText(label)).toContainHTML(`type="${type}"`);
      });
    });
  });

  context('when \'phone number\' field renders', () => {
    const phoneNumberField = makeSignUpField('phoneNumber');

    const { label, type } = phoneNumberField;

    it('renders \'KR (+82)\' & \'tel\' type input', () => {
      const { queryByText, getByLabelText } = renderSignUpField({ field: phoneNumberField });

      expect(queryByText('KR (+82)')).not.toBeNull();
      expect(getByLabelText(label)).toContainHTML(`type="${type}"`);
    });
  });

  context('when \'gender\' field renders', () => {
    const genderField = makeSignUpField('gender');

    it('renders gender selector', () => {
      const { getByLabelText, getByText } = renderSignUpField({ field: genderField });

      const genderSelector = getByLabelText(genderField.label);

      expect(genderSelector.firstChild).toBeEmptyDOMElement();

      genderOptions.forEach((({ text: gender }) => {
        expect(genderSelector).toContainElement(getByText(gender));
      }));
    });
  });
});
