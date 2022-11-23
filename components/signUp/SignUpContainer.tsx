import SignUpInput from './SignUpInput';

import SIGN_UP_INPUT_NAMES from '../../fixtures/signUpInputNames';

export default function SignUpContainer() {
  return (
    <>
      {SIGN_UP_INPUT_NAMES.map((inputName) => (
        <SignUpInput key={inputName} name={inputName} />
      ))}
    </>
  );
}
