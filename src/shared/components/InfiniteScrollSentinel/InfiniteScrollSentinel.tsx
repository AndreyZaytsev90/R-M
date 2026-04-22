import { useEffect, useRef } from 'react';

import { Loading } from '@/shared';
import { DEBOUNCE_DELAY } from '@/shared/constants';

import styles from './InfiniteScrollSentinel.module.scss';

type TInfiniteScrollSentinelProps = {
  totalCount: number;
  visibleCount: number;
  isLoadMore: boolean;
  onLoadMore: () => void;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const InfiniteScrollSentinel = ({
  totalCount,
  visibleCount,
  isLoadMore,
  onLoadMore,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}: TInfiniteScrollSentinelProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
          }

          debounceTimeoutRef.current = setTimeout(() => {
            if (visibleCount < totalCount) {
              onLoadMore();
            } else if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }, DEBOUNCE_DELAY);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [
    visibleCount,
    totalCount,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    onLoadMore
  ]);
  return (
    <>
      {isLoadMore && (
        <div className={styles.loading}>
          <Loading size='small' />
        </div>
      )}
      <div ref={sentinelRef} />
    </>
  );
};
