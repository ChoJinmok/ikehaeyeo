import type { HTMLInputTypeAttribute } from 'react';

import type { SignUpFields } from '../store/modules/signUpSlice';

export interface SignUpField {
  name: keyof SignUpFields;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}

const signUpFields: SignUpField[] = [
  { name: 'name', label: '이름' },
  { name: 'birthDate', label: '생일', placeholder: 'YYYY-MM-DD' },
  { name: 'phoneNumber', label: '휴대폰', type: 'tel' },
  { name: 'gender', label: '성별 (선택 사항)' },
  { name: 'streetNameAddress', label: '도로명 주소' },
  { name: 'detailedAddress', label: '상세 주소' },
  { name: 'zipCode', label: '우편번호', type: 'number' },
  { name: 'email', label: '이메일', type: 'email' },
  {
    name: 'password', label: '비밀번호', type: 'password', placeholder: '8자 이상, 대문자, 숫자, 특수문자 포함',
  },
];

export default signUpFields;
