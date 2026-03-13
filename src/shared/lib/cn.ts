import { clsx, type ClassValue } from 'clsx';

/**
 * Утилита для условного объединения CSS-классов
 * @param args - классы (строки, объекты, массивы)
 * @returns строка с объединёнными классами
 *
 * @example
 * cn('btn', 'primary')              // 'btn primary'
 * cn('btn', { active: true })       // 'btn active'
 * cn('btn', { active: false })      // 'btn'
 * cn('btn', null, undefined, 'big') // 'btn big'
 */
export const cn = (...args: ClassValue[]): string => clsx(...args);
