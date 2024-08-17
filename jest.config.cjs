module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.(spec|test).[tj]s?(x)'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(svg|jpg|jpeg|png|gif)$': '<rootDir>/__mocks__/svgMock.js',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.app.json', // Ensure this points to the correct tsconfig
    },
  },
};
