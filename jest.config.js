/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',

  // Все файлы *.test.ts / *.spec.ts в src
  testMatch: ['**/src/**/*.{test,spec}.{ts,tsx}'],

  // Преобразование TypeScript через ts-jest
  transform: {
    '^.+\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          // Нужно для корректных импортов CJS-пакетов (например, clsx)
          esModuleInterop: true,
          // Алиас «@/*» для проверки типов (аналог tsconfig.app.json)
          baseUrl: '.',
          paths: { '@/*': ['src/*'] }
        }
      }
    ]
  },

  // Алиас «@/*» — аналог resolve.alias из vite.config.ts
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // Игнорируем node_modules при поиске тестов
  testPathIgnorePatterns: ['/node_modules/']
};
