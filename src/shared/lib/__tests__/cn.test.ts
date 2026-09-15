import { cn } from '@/shared/lib/cn';

test('helper should returns a string from one class', () => {
  expect(cn('btn')).toBe('btn');
});

test('helper should combine several classes', () => {
  expect(cn('btn', 'primary')).toBe('btn primary');
});

test('helper should ignore falsy values', () => {
  expect(cn('btn', null, undefined, false, 0, '')).toBe('btn');
});

test('helper should return an empty string if there are no arguments', () => {
  expect(cn()).toBe('');
});
