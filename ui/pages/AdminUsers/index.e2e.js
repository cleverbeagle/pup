import { login, getPageUrl } from '../../../tests/helpers/e2e';

fixture('/admin/users').page('http://localhost:3000/login');

test('should allow users in admin role to access /admin/users', async (browser) => {
  await login({
    email: 'admin@admin.com',
    password: 'password',
    browser,
  });

  await browser.navigateTo('/admin/users');
  await browser.expect(getPageUrl()).contains('/admin/users');
});

test('should block users in users role from accessing /admin/users', async (browser) => {
  await login({
    email: 'user+1@test.com',
    password: 'password',
    browser,
  });

  await browser.navigateTo('/admin/users');
  await browser.expect(getPageUrl()).eql('http://localhost:3000/');
});
