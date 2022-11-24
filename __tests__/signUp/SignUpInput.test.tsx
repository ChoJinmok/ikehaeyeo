import { render } from '@testing-library/react';

import SignUpInput from '../../components/signUp/SignUpInput';

describe('SignUpInput', () => {
  it('renders label and input control', () => {
    const inputName = '이름';

    const { queryByLabelText } = render(
      <SignUpInput
        name={inputName}
      />,
    );

    expect(queryByLabelText(inputName)).not.toBeNull();
  });
});
