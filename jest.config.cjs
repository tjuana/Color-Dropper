module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',  // Используем jsdom для эмуляции браузера
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};
