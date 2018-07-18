export default (url, targetPath) => ({
  isMatch: (url.path && url.path.includes(targetPath)) || false,
  parts: url.path.split('/').filter(part => part.trim() !== ''),
});
