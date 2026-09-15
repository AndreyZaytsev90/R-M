import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Select } from '@/shared/components/Select/Select';

const baseProps = {
  options: [
    { label: 'Rick', value: 'rick' },
    { label: 'Morty', value: 'morty' }
  ],
  placeholder: 'Выбери персонажа',
  value: null,
  onChange: jest.fn(),
  size: 'large' as const
};

jest.mock('@/assets', () => ({
  ArrowDropdownIcon: (props: { className?: string }) => (
    <svg data-testid='arrow-icon' className={props.className} />
  )
}));

test('renders with size large: root div has class select--large', () => {
  const { container } = render(<Select {...baseProps} size='large' />);
  expect(container.firstChild).toHaveClass('select--large');
});

test('renders with size small: root div has class select--small', () => {
  const { container } = render(<Select {...baseProps} size='small' />);
  expect(container.firstChild).toHaveClass('select--small');
});

test('shows placeholder when nothing is selected', () => {
  render(<Select {...baseProps} />);
  expect(screen.getByText('Выбери персонажа')).toBeInTheDocument();
});

test('shows selected option instead of placeholder', () => {
  render(<Select {...baseProps} value='rick' />);
  expect(screen.getByText('Rick')).toBeInTheDocument();
  expect(screen.queryByText('Выбери персонажа')).not.toBeInTheDocument();
});
