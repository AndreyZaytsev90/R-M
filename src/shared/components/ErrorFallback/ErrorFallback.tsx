import { type FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  return <div>Something went wrong: {message}</div>;
}
