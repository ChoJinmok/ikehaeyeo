Feature('signup');

Scenario('test something', ({ I }) => {
  I.amOnPage('/signup');

  I.see('회원가입');
});
