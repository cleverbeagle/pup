import checkIfBlacklisted from './checkIfBlacklisted';

describe('checkIfBlacklisted.js', () => {
  test('it returns true if url is blacklisted', () => {
    const isBlacklisted = checkIfBlacklisted('/documents/abc123');
    expect(isBlacklisted).toBe(true);
  });

  test('it returns false if url is not blacklisted', () => {
    const isBlacklisted = checkIfBlacklisted('/admin/users');
    expect(isBlacklisted).toBe(false);
  });
});
