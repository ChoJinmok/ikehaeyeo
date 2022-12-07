import { render, fireEvent } from '@testing-library/react';

import SignUpField from '../../components/signUp/SignUpField';

import genderOptions from '../../fixtures/genderOptions';

describe('SignUpInput', () => {
  const handleChange = jest.fn();

  const fieldName = 'name';

  function renderSignUpField({ name = fieldName, value = '' } = {}) {
    return render(
      <SignUpField
        name={name}
        value={value}
        onChange={handleChange}
      />,
    );
  }

  beforeEach(() => {
    handleChange.mockClear();
  });

  it('renders label and field\'s control', () => {
    const { queryByLabelText } = renderSignUpField();

    expect(queryByLabelText(fieldName)).not.toBeNull();
    expect(queryByLabelText(fieldName)).toContainHTML('type="text"');
  });

  it('listens change events', () => {
    const targetValue = 'test';

    const { getByLabelText } = renderSignUpField();

    fireEvent.change(
      getByLabelText(fieldName),
      { target: { value: targetValue } },
    );

    expect(handleChange).toBeCalledWith(
      { name: fieldName, value: targetValue },
    );
  });

  it('renders input value', () => {
    const targetValue = 'test';

    const { getByLabelText } = renderSignUpField({ value: targetValue });

    expect(getByLabelText(fieldName)).toHaveValue(targetValue);
  });

  context('when \'phone number\' field renders', () => {
    it('renders \'KR (+82)\'', () => {
      const { queryByText } = renderSignUpField({ name: 'phoneNumber' });

      expect(queryByText('KR (+82)')).not.toBeNull();
    });
  });

  context('when \'gender\' field renders', () => {
    it('renders gender selector', () => {
      const { getByLabelText, getByText } = renderSignUpField({ name: 'gender' });

      const genderSelector = getByLabelText('gender');

      expect(genderSelector.firstChild).toBeEmptyDOMElement();

      genderOptions.forEach((({ text: gender }) => {
        expect(genderSelector).toContainElement(getByText(gender));
      }));
    });
  });
});
