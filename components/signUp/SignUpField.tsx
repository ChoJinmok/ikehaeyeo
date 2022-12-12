import { ChangeEvent } from 'react';

import genderOptions from '../../fixtures/genderOptions';

import { SignUpField as SignUpFieldType } from '../../fixtures/signUpFields';
import { HandleChangeParameter } from './type';

interface SignUpInputProps {
  field: SignUpFieldType;
  value: string | number;
  onChange: ({ name, value }: HandleChangeParameter) => void;
}

export default function SignUpField(
  { field: { name, label, type = 'text' }, value, onChange }: SignUpInputProps,
) {
  const id = `signUp-${name}`;

  function handleChange(
    { target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    onChange({ name, value: target.value });
  }

  return (
    <div>
      {name === 'phoneNumber' && <span>KR (+82)</span>}
      <label htmlFor={id}>
        {label}
      </label>
      {name === 'gender' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
        >
          <option aria-label="gender none" value="" />
          {genderOptions.map(({ value: genderValue, text }) => (
            <option key={genderValue} value={genderValue}>{text}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
