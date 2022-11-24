Feature('signup');

const signUpInputNames = [
  'name',
  'phoneNumber',
  'gender',
  'streetNameAddress',
  'detailedAddress',
  'zipCode',
  'email',
  'password',
];

Scenario('회원 가입 페이지 제목과 각 회원 가입 필요 항목들을 볼 수 있다.', ({ I }) => {
  I.amOnPage('/signup');

  I.see('IKEHAEYEO Family 회원 가입');

  signUpInputNames.forEach((inputName) => {
    I.see(inputName);
  });
});
