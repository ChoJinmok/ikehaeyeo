import { memo, Fragment } from 'react';

import SignUpField from './SignUpField';

import SIGN_UP_FIELDS from '../../fixtures/signUpFields';

import type { SignUpFields } from '../../store/modules/signUpSlice';
import type { HandleChangeController } from './type';

interface SignUpFormProps {
  signUpFields: SignUpFields;
  onChangeController: HandleChangeController;
  isMouseOverBirthDateToolTip: boolean;
  onMouseOverBirthDateToolTip: () => void;
  onMouseLeaveBirthDateToolTip: () => void;
  isPasswordVisible: boolean;
  onClickPasswordVisibleToggleButton: () => void;
}

function SignUpForm({
  signUpFields,
  onChangeController,
  isMouseOverBirthDateToolTip,
  onMouseOverBirthDateToolTip,
  onMouseLeaveBirthDateToolTip,
  isPasswordVisible,
  onClickPasswordVisibleToggleButton,
}: SignUpFormProps) {
  return (
    <form>
      {SIGN_UP_FIELDS.map((signUpField) => {
        const { name } = signUpField;

        return (
          <Fragment key={name}>
            {name === 'streetNameAddress' && (
              <button type="button">
                우편번호 찾기
              </button>
            )}

            <SignUpField
              field={signUpField}
              value={signUpFields[name]}
              onChangeController={onChangeController}
              isMouseOverBirthDateToolTip={isMouseOverBirthDateToolTip}
              onMouseOverBirthDateToolTip={onMouseOverBirthDateToolTip}
              onMouseLeaveBirthDateToolTip={onMouseLeaveBirthDateToolTip}
              isPasswordVisible={isPasswordVisible}
              onClickPasswordVisibleToggleButton={onClickPasswordVisibleToggleButton}
            />
          </Fragment>
        );
      })}
    </form>
  );
}

export default memo(SignUpForm);
