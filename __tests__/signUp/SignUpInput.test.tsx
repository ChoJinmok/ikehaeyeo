import { render, fireEvent } from '@testing-library/react';

import SignUpInput from '../../components/signUp/SignUpInput';

describe('SignUpInput', () => {
  const handleChange = jest.fn();

  const inputName = 'name';

  function renderSignUpInput({ name = inputName, value = '' } = {}) {
    return render(
      <SignUpInput
        name={name}
        value={value}
        onChange={handleChange}
      />,
    );
  }

  beforeEach(() => {
    handleChange.mockClear();
  });

  it('renders label and input control', () => {
    const { queryByLabelText } = renderSignUpInput();

    expect(queryByLabelText(inputName)).not.toBeNull();
    expect(queryByLabelText(inputName)).toContainHTML('type="text"');
  });

  it('listens change events', () => {
    const targetValue = 'test';

    const { getByLabelText } = renderSignUpInput();

    fireEvent.change(
      getByLabelText(inputName),
      { target: { value: targetValue } },
    );

    expect(handleChange).toBeCalledWith(
      { name: inputName, value: targetValue },
    );
  });

  it('renders input value', () => {
    const targetValue = 'test';

    const { getByLabelText } = renderSignUpInput({ value: targetValue });

    expect(getByLabelText(inputName)).toHaveValue(targetValue);
  });

  context('when \'phone number\' input renders', () => {
    it('renders \'KR (+82)\'', () => {
      const { queryByText } = renderSignUpInput({ name: 'phoneNumber' });

      expect(queryByText('KR (+82)')).not.toBeNull();
    });
  });
});
