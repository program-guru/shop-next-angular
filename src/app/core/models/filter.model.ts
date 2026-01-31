export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | null;

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  searchQuery: string;
  brands: string[];
  categories: string[];
  sizes: string[];
  minRating: number | null;
  priceRange: PriceRange;
  sortBy: SortOption;
}