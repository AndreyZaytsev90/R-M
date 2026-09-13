/** @type {import('jest').Config} */
export default {
  // jsdom — эмуляция браузера, нужна для тестов React-компонентов
  testEnvironment: 'jsdom',

  // Все файлы *.test.ts / *.spec.ts в src
  testMatch: ['**/src/**/*.{test,spec}.{ts,tsx}'],

  // Преобразование TypeScript через ts-jest
  transform: {
    '^.+\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }]
  },

  // Маппинг ресурсов, которые Jest не умеет обрабатывать «из коробки»
  moduleNameMapper: {
    // Алиас «@/*» — аналог resolve.alias из vite.config.ts
    '^@/(.*)$': '<rootDir>/src/$1',
    // CSS-модули: каждый ключ styles возвращает само имя класса (styles.select → 'select')
    '\.module\.(css|scss|sass)$': 'identity-obj-proxy'
    // SVG-иконки не маппим здесь: они мокаются в тестах через jest.mock('@/assets', ...)
  },

  // Игнорируем node_modules при поиске тестов
  testPathIgnorePatterns: ['/node_modules/']
};
