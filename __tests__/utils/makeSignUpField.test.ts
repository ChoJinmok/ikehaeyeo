import makeSignUpField from '../../utils/makeSignUpField';

import type { SignUpField } from '../../fixtures/signUpFields';

describe('makeSignUpField', () => {
  context('without name present in signUpField', () => {
    it('returns non-existent object', () => {
      const signUpFields: SignUpField[] = [{ name: 'name', label: '이름' }];
      const targetName = 'email';

      const { name } = makeSignUpField(targetName, signUpFields);

      expect(name).toBe(targetName);
    });
  });

  context('with name present in signUpField', () => {
    it('returns matching object', () => {
      const targetName = 'name';

      const { name } = makeSignUpField(targetName);

      expect(name).toBe(targetName);
    });
  });
});
