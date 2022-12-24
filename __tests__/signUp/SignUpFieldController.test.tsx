import { render, fireEvent } from '@testing-library/react';

import SignUpFieldController from '../../components/signUp/SignUpFieldController';

import makeSignUpField from '../../utils/makeSignUpField';

import genderOptions from '../../fixtures/genderOptions';

import type { SignUpField } from '../../fixtures/signUpFields';
import type { ValueOfSignUpFields } from '../../components/signUp/type';

describe('SignUpFieldController', () => {
  const handleChange = jest.fn();

  interface RenderSignUpFieldControllerParams {
    type?: SignUpField['type'];
    name?: SignUpField['name'];
    value?: ValueOfSignUpFields;
    placeholder?: string;
    required?: boolean;
    isPasswordVisible?: boolean;
  }

  function renderSignUpFieldController({
    type, name = 'name', value = '', placeholder, required = true,
    isPasswordVisible = false,
  }: RenderSignUpFieldControllerParams = {}) {
    const id = `signUp-${name}`;

    return render(
      <SignUpFieldController
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleChange}
        isPasswordVisible={isPasswordVisible}
      />,
    );
  }

  beforeEach(() => {
    handleChange.mockClear();
  });

  context('when rendering gender controller', () => {
    const name = 'gender';
    const required = false;

    it('renders gender selector set required attribute', () => {
      const {
        getByTestId,
        getByText,
        getAllByRole,
      } = renderSignUpFieldController({ name, required });

      const genderSelector = getByTestId('gender-select');
      const genderNoneOption = getAllByRole('option')[0];

      expect(genderSelector).not.toHaveAttribute('required');

      expect(genderNoneOption).toBeEmptyDOMElement();

      genderOptions.forEach((({ text: gender }) => {
        expect(genderSelector).toContainElement(getByText(gender));
      }));
    });

    it('listens to change event', () => {
      const [{ value }] = genderOptions;

      const { getByTestId } = renderSignUpFieldController({ name });

      const genderSelect = getByTestId('gender-select');

      fireEvent.change(
        genderSelect,
        { target: { value } },
      );

      expect(handleChange).toBeCalledWith({ name, value });
    });

    it('renders controller value', () => {
      const [{ value }] = genderOptions;

      const { getByTestId } = renderSignUpFieldController({ name, value });

      expect(getByTestId('gender-select')).toHaveValue(value);
    });
  });

  context('excluding gender controller', () => {
    it('renders controller value', () => {
      const value = 'test';

      const { getByRole } = renderSignUpFieldController({ value });

      const textbox = getByRole('textbox');

      expect(textbox).toHaveValue(value);
      expect(textbox).toHaveAttribute('required');
    });

    it('listens change events', () => {
      const targetValue = 'test';

      const { getByRole } = renderSignUpFieldController();

      fireEvent.change(
        getByRole('textbox'),
        { target: { value: targetValue } },
      );

      expect(handleChange).toBeCalledWith(
        { name: 'name', value: targetValue },
      );
    });

    context('with type other than \'text\'', () => {
      const types: Array<SignUpField['type']> = ['password', 'tel', 'email', 'number'];

      it('renders matched type input', () => {
        types.forEach((type) => {
          const { getByTestId } = renderSignUpFieldController({ type });

          expect(getByTestId(`${type}-input`)).toHaveAttribute('type', type);
        });
      });
    });

    context('with text type', () => {
      it('renders textbox', () => {
        const { queryByRole } = renderSignUpFieldController();

        const signUpInput = queryByRole('textbox');

        expect(signUpInput).not.toBeNull();
      });
    });

    context('when field has placeholder', () => {
      const { placeholder } = makeSignUpField('password');

      it('renders placeholder', () => {
        const { queryByPlaceholderText } = renderSignUpFieldController({
          placeholder,
        });

        expect(queryByPlaceholderText(placeholder as string)).not.toBeNull();
      });
    });

    context('when field doesn\'t have placeholder', () => {
      it('doesn\'t render placeholder', () => {
        const { getByRole } = renderSignUpFieldController();

        expect(getByRole('textbox')).not.toHaveAttribute('placeholder');
      });
    });

    context('when rendering password controller', () => {
      const { name, type } = makeSignUpField('password');

      context('when password is \'not\' visible', () => {
        it('renders \'password\' type input', () => {
          const { queryByTestId } = renderSignUpFieldController({ name, type });

          expect(queryByTestId(`${type}-input`)).not.toBeNull();
        });
      });

      context('when password is visible', () => {
        const isPasswordVisible = true;

        it('renders \'textbox\'', () => {
          const { queryByRole } = renderSignUpFieldController({ name, type, isPasswordVisible });

          expect(queryByRole('textbox')).not.toBeNull();
        });
      });
    });
  });
});
