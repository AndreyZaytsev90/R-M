# Rick and Morty Characters

Интерактивное веб-приложение для просмотра персонажей из вселенной **Rick and Morty**. Построено на основе публичного [Rick and Morty API](https://rickandmortyapi.com/).

## 🚀 Демо

Проект развёрнут и доступен по ссылке:  
**[https://rick-and-morty-characters.netlify.app](https://rick-and-morty-characters.netlify.app)** _(указать актуальную ссылку)_

---

## 📋 Функционал

- **Просмотр списка персонажей** — бесконечный скролл с подгрузкой данных
- **Фильтрация и поиск** — по имени, статусу, виду, полу
- **Карточка персонажа** — детальная информация с изображением
- **Редактирование** — возможность изменить имя, статус, локацию персонажа (локально)
- **Адаптивная 404 страница** — при несуществующем ID или невалидном маршруте
- **Обработка ошибок** — graceful fallback при проблемах с API

---

## 🛠 Технологический стек

| Категория        | Технологии                            |
| ---------------- | ------------------------------------- |
| **Framework**    | React 19, TypeScript                  |
| **Build**        | Vite                                  |
| **State & Data** | React Query (TanStack Query), Axios   |
| **Routing**      | React Router v7                       |
| **Styling**      | SCSS Modules                          |
| **UI/UX**        | react-hot-toast, react-error-boundary |
| **Linting**      | ESLint, Prettier, Stylelint           |

---

## 📁 Структура проекта

```
src/
├── pages/              # Страницы приложения
│   ├── CharactersList/ # Список персонажей
│   ├── CharacterCard/  # Карточка персонажа
│   └── NotFound/       # 404 страница
├── widgets/            # Крупные блоки (CharacterCard, CharacterFilterPanel)
├── shared/             # Переиспользуемый код
│   ├── api/            # API-клиент
│   ├── components/     # Базовые UI-компоненты
│   ├── hooks/          # Кастомные хуки
│   ├── types/          # TypeScript типы
│   └── constants/      # Константы
├── assets/             # Изображения, иконки
└── styles/             # Глобальные стили
```

---

## ⚙️ Установка и запуск

### Требования

- Node.js ≥ 18
- npm / yarn / pnpm

### 1. Клонирование и установка зависимостей

```bash
git clone <repository-url>
cd rick-and-morty

# npm
npm install

# yarn
yarn install
```

### 2. Запуск разработки

```bash
# npm
npm run dev

# yarn
yarn dev
```

Приложение доступно по адресу: **http://localhost:5173**

### 3. Сборка для продакшена

```bash
# npm
npm run build

# yarn
yarn build
```

Результат в папке `dist/`

### 4. Предпросмотр сборки

```bash
# npm
npm run preview

# yarn
yarn preview
```

---

## 🧹 Проверка кода

```bash
# ESLint
npm run lint    # или yarn lint

# Stylelint (SCSS)
npm run lint:style    # или yarn lint:style
```

---

## 📝 Примечания

- API: [Rick and Morty API](https://rickandmortyapi.com/documentation/)
- Проект использует **Feature-Sliced Design** подход (pages/widgets/shared)
- Типизация API через **orval** (см. `orval.config.ts`)

---

## 👨‍💻 Автор

Andrey Zaytsev

---

## 🚀 Деплой на GitHub Pages

### Быстрый деплой

```bash
# Установить зависимости
npm install

# Запустить деплой
npm run deploy
```

Команда `deploy` сделает сборку проекта и загрузит результат в ветку `gh-pages`.

### Автоматический деплой через GitHub Actions

Проект настроен на автоматический деплой при пуше в ветку `main`. Workflow находится в `.github/workflows/deploy.yml`.

### Включение GitHub Pages в репозитории:

1. Зайдите в **Settings** → **Pages**
2. В разделе **Source** выберите **GitHub Actions**
3. После первого деплоя появится ссылка на ваш сайт

### Ссылка на сайт

После деплоя сайт будет доступен по адресу:

```
https://<ваш-username>.github.io/<имя-репозитория>/
```

> **Важно:** Убедитесь, что `base` в `vite.config.ts` совпадает с именем репозитория.
