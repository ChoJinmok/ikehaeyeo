import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SignUpForm from './SignUpForm';

import { RootState } from '../../store';
import { HandleChangeParameter } from './type';

import { changeSignUpField } from '../../store/modules/signUpSlice';

export default function SignUpContainer() {
  const dispatch = useDispatch();

  const { signUpFields } = useSelector(({ signUp }: RootState) => signUp);

  const handleChange = useCallback(({ name, value }: HandleChangeParameter) => {
    dispatch(changeSignUpField({ name, value }));
  }, [dispatch]);

  return (
    <SignUpForm
      signUpFields={signUpFields}
      onChange={handleChange}
    />
  );
}
