import React, { memo, useMemo } from 'react';
import { useVirtualization } from '../hooks/useVirtualization';
import { OptimizedMovieCard } from './OptimizedMovieCard';
import type { Movie, TVShow } from '../types/movie';

interface VirtualizedGridProps {
  items: (Movie | TVShow)[];
  type: 'movie' | 'tv';
  containerHeight?: number;
  itemHeight?: number;
  columns?: number;
}

export const VirtualizedGrid = memo(function VirtualizedGrid({
  items,
  type,
  containerHeight = 600,
  itemHeight = 400,
  columns = 5
}: VirtualizedGridProps) {
  // Calculate grid layout
  const gridItems = useMemo(() => {
    const rows: (Movie | TVShow)[][] = [];
    for (let i = 0; i < items.length; i += columns) {
      rows.push(items.slice(i, i + columns));
    }
    return rows;
  }, [items, columns]);

  const {
    visibleItems,
    totalHeight,
    handleScroll
  } = useVirtualization({
    items: gridItems,
    itemHeight,
    containerHeight,
    overscan: 2
  });

  return (
    <div 
      className="relative overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item: row, index, offsetY }) => (
          <div
            key={index}
            className="absolute w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4"
            style={{
              transform: `translateY(${offsetY}px)`,
              height: itemHeight
            }}
          >
            {row.map((item, colIndex) => (
              <OptimizedMovieCard
                key={`${item.id}-${type}`}
                item={item}
                type={type}
                priority={index < 2} // Priority loading for first 2 rows
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});