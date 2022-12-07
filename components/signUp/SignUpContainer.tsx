import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SignUpField from './SignUpField';

import { RootState } from '../../store';
import { HandleChangeParameter } from './type';

import { changeSignUpField } from '../../store/modules/signUpSlice';

import SIGN_UP_FIELDS from '../../fixtures/signUpFields';

export default function SignUpContainer() {
  const dispatch = useDispatch();

  const { signUpFields } = useSelector(({ signUp }: RootState) => signUp);

  const handleChange = useCallback(({ name, value }: HandleChangeParameter) => {
    dispatch(changeSignUpField({ name, value }));
  }, [dispatch]);

  return (
    <>
      {SIGN_UP_FIELDS.map((signUpField) => {
        const { name } = signUpField;

        return (
          <SignUpField
            key={name}
            field={signUpField}
            value={signUpFields[name]}
            onChange={handleChange}
          />
        );
      })}
    </>
  );
}
