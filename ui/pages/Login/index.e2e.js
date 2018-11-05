import { login, getPageUrl } from '../../../tests/helpers/e2e';

fixture('/login').page('http://localhost:3000/login');

test('should allow users to login and see their documents', async (browser) => {
  await login({
    email: 'user+1@test.com',
    password: 'password',
    browser,
  });

  await browser.expect(getPageUrl()).contains('/documents');
});
