module.exports = {
  modulePaths: ['<rootDir>/node_modules/', '<rootDir>/tests/__mocks__/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy', // NOTE: https://jestjs.io/docs/en/webpack#mocking-css-modules
    '^meteor/(.*):(.*)$': '<rootDir>/tests/__mocks__/meteor/$1_$2',
  },
  unmockedModulePathPatterns: [
    '/^imports\\/.*\\.jsx?$/',
    '/^imports\\/.*\\.scss?$/',
    '/^node_modules/',
  ],
};
