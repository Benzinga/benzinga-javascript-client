module.exports = {
  coverageDirectory: '../../../../../coverage/libs/data/manager/calendars/option-activity',
  displayName: 'data-manager-calendars-option-activity',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
};
