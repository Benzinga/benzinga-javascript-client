module.exports = {
  coverageDirectory: '../../../coverage/libs/utils/date',
  displayName: 'utils-date',
  globals: {},
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
};
