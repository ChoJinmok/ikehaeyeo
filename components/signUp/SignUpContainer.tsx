import { useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SignUpForm from './SignUpForm';

import { changeSignUpField } from '../../store/modules/signUpSlice';

import type { RootState } from '../../store';
import type { HandleChangeControllerParameter } from './type';

interface SignUpState {
  isMouseOverBirthDateToolTip: boolean;
  isPasswordVisible: boolean;
}

export default function SignUpContainer() {
  const [state, setState] = useState<SignUpState>({
    isMouseOverBirthDateToolTip: false,
    isPasswordVisible: false,
  });

  const { isMouseOverBirthDateToolTip, isPasswordVisible } = state;

  const dispatch = useDispatch();

  const { signUpFields } = useSelector(({ signUp }: RootState) => signUp);

  const handleChangeController = useCallback(
    ({ name, value }: HandleChangeControllerParameter) => {
      dispatch(changeSignUpField({ name, value }));
    }
    , [dispatch],
  );

  const handleMouseOverBirthDateToolTip = useCallback(() => {
    setState({
      ...state,
      isMouseOverBirthDateToolTip: true,
    });
  }, [state, setState]);

  const handleMouseLeaveBirthDateToolTip = useCallback(() => {
    setState({
      ...state,
      isMouseOverBirthDateToolTip: false,
    });
  }, [state, setState]);

  const handleClickPasswordVisibleToggleButton = useCallback(() => {
    setState({
      ...state,
      isPasswordVisible: !isPasswordVisible,
    });
  }, [state, setState, isPasswordVisible]);

  return (
    <SignUpForm
      signUpFields={signUpFields}
      onChangeController={handleChangeController}
      isMouseOverBirthDateToolTip={isMouseOverBirthDateToolTip}
      onMouseOverBirthDateToolTip={handleMouseOverBirthDateToolTip}
      onMouseLeaveBirthDateToolTip={handleMouseLeaveBirthDateToolTip}
      isPasswordVisible={isPasswordVisible}
      onClickPasswordVisibleToggleButton={handleClickPasswordVisibleToggleButton}
    />
  );
}
