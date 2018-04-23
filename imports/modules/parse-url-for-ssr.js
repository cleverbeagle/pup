export default (url, targetPath) => {
  return {
    isMatch: (url.path && url.path.includes(targetPath)) || false,
    parts: url.path.split('/').filter(part => part.trim() !== ''),
  };
};
