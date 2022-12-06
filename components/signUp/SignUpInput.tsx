import { memo, ChangeEvent } from 'react';

import { HandleChangeParameter } from './type';

interface SignUpInputProps {
    name: string;
    value: string;
    onChange: ({ name, value }: HandleChangeParameter) => void;
}

function SignUpInput(
  { name, value, onChange }: SignUpInputProps,
) {
  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    onChange({ name, value: target.value });
  }

  return (
    <div>
      {name === 'phoneNumber' && <span>KR (+82)</span>}
      <label htmlFor={name}>
        {name}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default memo(SignUpInput);
