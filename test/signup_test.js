Feature('signup');

const signUpFields = [
  '이름',
  '생일',
  '휴대폰',
  '성별 (선택 사항)',
  '도로명 주소',
  '상세 주소',
  '우편번호',
  '이메일',
  '비밀번호',
];

Scenario('회원 가입 페이지 제목과 각 회원 가입 필요 항목들을 볼 수 있다.', ({ I }) => {
  I.amOnPage('/signup');

  I.see('IKEHAEYEO Family 회원 가입');

  signUpFields.forEach((signUpField) => {
    I.see(signUpField);
  });
});
