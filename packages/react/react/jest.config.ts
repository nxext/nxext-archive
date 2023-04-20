/* eslint-disable */
export default {
  displayName: 'react',

  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', '<rootDir>/tsconfig.spec.json'],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html', 'json'],
  coverageDirectory: '../../coverage/packages/react',
  preset: '../../jest.preset.js',
};
