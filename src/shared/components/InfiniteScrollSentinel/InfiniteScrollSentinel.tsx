import { useEffect, useRef } from 'react';

import { Loading } from '@/shared/components';

import styles from './InfiniteScrollSentinel.module.scss';

type TInfiniteScrollSentinelProps = {
  totalCount: number;
  visibleCount: number;
  onLoadMore: () => void;
  isLoadMore: boolean;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const InfiniteScrollSentinel = ({
  totalCount,
  visibleCount,
  onLoadMore,
  isLoadMore,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}: TInfiniteScrollSentinelProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        if (visibleCount < totalCount) {
          onLoadMore();
        } else if (hasNextPage) {
          fetchNextPage();
        }
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
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
      {isFetchingNextPage || isLoadMore}

      <div className={styles.loading}>
        <Loading size='small' />
      </div>

      <div ref={sentinelRef} />
    </>
  );
};
