import { useEffect, useRef, useState } from 'react';

import { RickAndMortyIcon } from '@/assets';
import { Loading } from '@/shared/components';
import { useInfiniteCharacters } from '@/shared/hooks';
import type { TFilterType } from '@/shared/types';
import { CharacterCard, CharacterFilterPanel } from '@/widgets';

//import { useCharacters } from '../../shared/hooks/useCharacters';
import styles from './CharactersListPage.module.scss';

const STEP = 4;

export const CharactersListPage = () => {
  const [filters, setFilters] = useState<Record<TFilterType, string | null>>({
    name: null,
    species: null,
    gender: null,
    status: null
  });
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(STEP);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage, // вызываем когда пользователь долистал до конца
    hasNextPage, // true если есть ещё страницы (getNextPageParam вернул не undefined)
    isFetchingNextPage // true пока грузится следующая страница
    //
  } = useInfiniteCharacters(filters);

  const characters = data?.pages.flatMap((page) => page.results) ?? [];
  const visibleCharacters = characters.slice(0, visibleCount);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const allLoaded = characters.length; // сколько всего загружено с API

          if (visibleCount < allLoaded) {
            // ещё есть скрытые карточки — просто показываем больше
            setVisibleCount((prev) => prev + STEP);
          } else if (hasNextPage && !isFetchingNextPage) {
            // все загруженные уже показаны — грузим следующую страницу с API
            fetchNextPage();
          }
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    visibleCount,
    characters.length
  ]);

  const handleFilterChange = (type: TFilterType, value: string | null) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setVisibleCount(STEP); // сброс здесь
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, name: value }));
    setVisibleCount(STEP); // сброс здесь
  };

  return (
    <main className={styles.container}>
      <img
        src={RickAndMortyIcon}
        alt='Rick and Morty'
        width={600}
        height={200}
      />
      <CharacterFilterPanel
        filters={filters}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      {/* {!hasError && characters && !isEmpty && (
        <section className={styles.cardList}>
          {characters.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </section>
      )} */}
      {!isError && characters.length > 0 && (
        <section className={styles.cardList}>
          {visibleCharacters.map(
            (
              character // characters теперь уже плоский массив
            ) => (
              <CharacterCard key={character.id} character={character} />
            )
          )}
        </section>
      )}
      {(isLoading || isFetchingNextPage) && <Loading size='small' />}
      <div ref={sentinelRef} />
    </main>
  );
};
