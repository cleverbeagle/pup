import UrlPattern from 'url-pattern';
import blackListedPatterns from './blackListedPatterns';

export default (url) => {
  if (blackListedPatterns && blackListedPatterns.length) {
    return blackListedPatterns.some((blacklistedPattern) => {
      const pattern = new UrlPattern(blacklistedPattern);
      return !!pattern.match(url) === true;
    });
  }
  return false;
};