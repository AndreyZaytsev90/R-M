import { type FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
  return <div>Что-то пошло не так: {message}</div>;
}
