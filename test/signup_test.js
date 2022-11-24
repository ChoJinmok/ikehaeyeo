Feature('signup');

Scenario('test something', ({ I }) => {
  I.amOnPage('/signup');

  I.see('IKEHAEYEO Family 회원 가입');
});
