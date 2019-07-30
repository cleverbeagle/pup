import UrlPattern from 'url-pattern';

export default (url) => {
  let isBlacklisted = false;
  ['/documents(/:id)'].forEach((blacklistedPattern) => {
    const pattern = new UrlPattern(blacklistedPattern);
    isBlacklisted = !!pattern.match(url);
  });
  return isBlacklisted;
};
