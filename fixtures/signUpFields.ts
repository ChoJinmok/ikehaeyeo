export interface SignUpField {
  name: string;
  label: string;
}

const signUpFields: SignUpField[] = [
  { name: 'name', label: '이름' },
  { name: 'birthDate', label: '생일' },
  { name: 'phoneNumber', label: '휴대폰' },
  { name: 'gender', label: '성별 (선택 사항)' },
  { name: 'streetNameAddress', label: '도로명 주소' },
  { name: 'detailedAddress', label: '상세 주소' },
  { name: 'zipCode', label: '우편번호' },
  { name: 'email', label: '이메일' },
  { name: 'password', label: '비밀번호' },
];

export default signUpFields;
