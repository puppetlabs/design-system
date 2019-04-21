module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/fileMock.js',
    '\\.scss$': 'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules', 'src/client'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/jest/'],
};
