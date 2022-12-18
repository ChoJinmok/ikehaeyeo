import { ChangeEvent } from 'react';

import genderOptions from '../../fixtures/genderOptions';

import { SignUpField } from '../../fixtures/signUpFields';

import { HandleChange, ValueOfSignUpFields } from './type';

interface SignUpFieldControllerProps {
  id: string;
  type?: SignUpField['type'];
  name: SignUpField['name'];
  value: ValueOfSignUpFields;
  placeholder?: string;
  onChange: HandleChange;
}

export default function SignUpFieldController({
  id, type, name, value, placeholder, onChange,
}: SignUpFieldControllerProps) {
  function handleChange(
    { target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    onChange({ name, value: target.value });
  }

  if (name === 'gender') {
    return (
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        data-testid="gender-select"
      >
        <option aria-label="gender none" value="" />
        {genderOptions.map(({ value: genderValue, text }) => (
          <option key={genderValue} value={genderValue}>{text}</option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder && placeholder}
      onChange={handleChange}
      data-testid={
        type === 'text' ? null : `${type}-input`
      }
    />
  );
}

SignUpFieldController.defaultProps = {
  type: 'text',
  placeholder: undefined,
};