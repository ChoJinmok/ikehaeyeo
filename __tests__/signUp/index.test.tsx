import { render } from '@testing-library/react';

import SignUp from '../../pages/signUp/index';

describe('SignUp', () => {
  it('renders title', () => {
    const { container } = render(<SignUp />);

    expect(container).toHaveTextContent('회원가입');
  });
});
