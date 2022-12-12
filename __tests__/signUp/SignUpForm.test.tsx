import { render, fireEvent } from '@testing-library/react';

import SignUpForm from '../../components/signUp/SignUpForm';

import SIGN_UP_FIELDS from '../../fixtures/signUpFields';
import { initialState } from '../../store/modules/signUpSlice';

describe('SignUpForm', () => {
  const handleChange = jest.fn();
  const { signUpFields } = initialState;

  function renderSignUpForm() {
    return render(
      <SignUpForm
        signUpFields={signUpFields}
        onChange={handleChange}
      />,
    );
  }

  it('renders sign up controls', () => {
    const { queryByLabelText } = renderSignUpForm();

    SIGN_UP_FIELDS.forEach(
      ({ name, label }) => {
        const signUpInput = queryByLabelText(label);

        expect(signUpInput).not.toBeNull();
        expect(signUpInput).toHaveValue(signUpFields[name]);
      },
    );
  });

  it('listens change events', () => {
    const [{ name, label }] = SIGN_UP_FIELDS;
    const targetValue = 'test';

    const { getByLabelText } = renderSignUpForm();

    fireEvent.change(getByLabelText(label), {
      target: { value: targetValue },
    });

    expect(handleChange).toBeCalledWith({
      name,
      value: targetValue,
    });
  });
});
