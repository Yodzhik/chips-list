# ChipList

Адаптивный компонент для отображения списка чипсов с возможностью выбора и попапом для отображения скрытых элементов.

## Особенности

- Отображение чипсов в одну строку
- Адаптивность под ширину экрана
- Попап для отображения скрытых чипсов
- Возможность выбора чипсов
- Возможность переиспользования компонентов
- Написан на TypeScript с использованием React

## Установка

```bash
# Клонировать репозиторий
git clone [URL репозитория]

# Перейти в директорию проекта
cd chips

# Установить зависимости
npm install
```

## Запуск

```bash
# Запустить проект в режиме разработки
npm run dev
```

## Использование

### ChipList

```tsx
import ChipList from './components/ChipList';

const chips = [
  { id: 1, label: 'Чипс 1' },
  { id: 2, label: 'Чипс 2' },
  // ...
];

function App() {

  return (
    <ChipList
      chips={chips}
    />
  );
}
```

### Chip (отдельный компонент)

```tsx
import Chip from './components/Chip';

function MyComponent() {
  return (
    <Chip
      label="Мой чипс"
      onClickChip={() => console.log('Клик!')}
    />
  );
}
```

## Технологии

- React
- TypeScript

## Требования

- Node.js >= 14.0.0
- npm >= 6.0.0
