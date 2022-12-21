import { useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SignUpForm from './SignUpForm';

import { changeSignUpField } from '../../store/modules/signUpSlice';

import type { RootState } from '../../store';
import type { HandleChangeControllerParameter } from './type';

export default function SignUpContainer() {
  const [isMouseOverBirthDateToolTip, setIsMouseOverBirthDateToolTip] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { signUpFields } = useSelector(({ signUp }: RootState) => signUp);

  const handleChangeController = useCallback(
    ({ name, value }: HandleChangeControllerParameter) => {
      dispatch(changeSignUpField({ name, value }));
    }
    , [dispatch],
  );

  const handleMouseOverBirthDateToolTip = useCallback(() => {
    setIsMouseOverBirthDateToolTip(true);
  }, [setIsMouseOverBirthDateToolTip]);

  const handleMouseLeaveBirthDateToolTip = useCallback(() => {
    setIsMouseOverBirthDateToolTip(false);
  }, [setIsMouseOverBirthDateToolTip]);

  return (
    <SignUpForm
      signUpFields={signUpFields}
      onChangeController={handleChangeController}
      isMouseOverBirthDateToolTip={isMouseOverBirthDateToolTip}
      onMouseOverBirthDateToolTip={handleMouseOverBirthDateToolTip}
      onMouseLeaveBirthDateToolTip={handleMouseLeaveBirthDateToolTip}
    />
  );
}
