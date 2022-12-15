import { useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SignUpForm from './SignUpForm';

import { RootState } from '../../store';
import { HandleChangeParameter } from './type';

import { changeSignUpField } from '../../store/modules/signUpSlice';

export default function SignUpContainer() {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { signUpFields } = useSelector(({ signUp }: RootState) => signUp);

  const handleChange = useCallback(({ name, value }: HandleChangeParameter) => {
    dispatch(changeSignUpField({ name, value }));
  }, [dispatch]);

  const handMouseOver = useCallback(() => {
    setIsMouseOver(true);
  }, [setIsMouseOver]);

  const handMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, [setIsMouseOver]);

  return (
    <SignUpForm
      signUpFields={signUpFields}
      onChange={handleChange}
      isMouseOver={isMouseOver}
      onMouseOver={handMouseOver}
      onMouseLeave={handMouseLeave}
    />
  );
}
