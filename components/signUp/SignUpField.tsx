import { memo, ChangeEvent } from 'react';

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
    { target }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
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
          <option value="male">남성</option>
          <option value="female">여성</option>
          <option value="prefer_net_to_say">응답 거부</option>
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
