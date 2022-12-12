import { render, fireEvent } from '@testing-library/react';

import SignUpFieldController from '../../components/signUp/SignUpFieldController';

import makeSignUpField from '../../utils/makeSignUpField';

import genderOptions from '../../fixtures/genderOptions';

import { SignUpField } from '../../fixtures/signUpFields';
import { ValueOfSignUpFields } from '../../components/signUp/type';

describe('SignUpFieldController', () => {
  const handleChange = jest.fn();

  interface RenderSignUpFieldControllerParams {
    type?: SignUpField['type'];
    name?: SignUpField['name'];
    value?: ValueOfSignUpFields;
  }

  function renderSignUpFieldController({
    type, name = 'name', value = '',
  }: RenderSignUpFieldControllerParams = {}) {
    return render(
      <SignUpFieldController
        id={`signUp-${name}`}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />,
    );
  }

  beforeEach(() => {
    handleChange.mockClear();
  });

  context('when rendering gender controller', () => {
    const { name } = makeSignUpField('gender');

    it('renders gender selector', () => {
      const { getByTestId, getByText, getAllByRole } = renderSignUpFieldController({ name });

      const genderSelector = getByTestId('gender-select');
      const genderNoneOption = getAllByRole('option')[0];

      expect(genderNoneOption).toBeEmptyDOMElement();

      genderOptions.forEach((({ text: gender }) => {
        expect(genderSelector).toContainElement(getByText(gender));
      }));
    });

    it('listens to change event', () => {
      const [{ value }] = genderOptions;

      const { getByTestId } = renderSignUpFieldController({ name });

      const genderSelect = getByTestId('gender-select');

      expect(genderSelect).toHaveValue('');

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
    const type = 'password';

    context('with type other than \'text\'', () => {
      it('renders matched type input', () => {
        const { getByTestId } = renderSignUpFieldController({
          type,
        });

        expect(getByTestId(`${type}-input`)).toHaveAttribute('type', type);
      });
    });

    context('with text type', () => {
      it('renders textbox', () => {
        const { queryByRole } = renderSignUpFieldController();

        const signUpInput = queryByRole('textbox');

        expect(signUpInput).not.toBeNull();
      });
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

    it('renders controller value', () => {
      const value = 'test';

      const { getByRole } = renderSignUpFieldController({ value });

      expect(getByRole('textbox')).toHaveValue(value);
    });
  });
});
