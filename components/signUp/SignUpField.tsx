import { memo, ChangeEvent } from 'react';

import genderOptions from '../../fixtures/genderOptions';

import { HandleChangeParameter } from './type';

interface SignUpInputProps {
    name: string;
    value: string;
    onChange: ({ name, value }: HandleChangeParameter) => void;
}

function SignUpField(
  { name, value, onChange }: SignUpInputProps,
) {
  function handleChange(
    { target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    onChange({ name, value: target.value });
  }

  return (
    <div>
      {name === 'phoneNumber' && <span>KR (+82)</span>}
      <label htmlFor={name}>
        {name}
      </label>
      {name === 'gender' ? (
        <select
          id={name}
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
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default memo(SignUpField);
