import { Injectable, signal, computed } from '@angular/core';
import { PriceRange, SortOption } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _searchQuery = signal<string>('');
  private _brands = signal<string[]>([]);
  private _categories = signal<string[]>([]);
  private _sizes = signal<string[]>([]);
  private _minRating = signal<number | null>(null);
  private _priceRange = signal<PriceRange>({ min: 0, max: 20000 });
  private _sortBy = signal<SortOption>(null);

  readonly searchQuery = this._searchQuery.asReadonly();
  readonly brands = this._brands.asReadonly();
  readonly categories = this._categories.asReadonly();
  readonly sizes = this._sizes.asReadonly();
  readonly minRating = this._minRating.asReadonly();
  readonly priceRange = this._priceRange.asReadonly();
  readonly sortBy = this._sortBy.asReadonly();

  setSearchQuery(query: string) {
    this._searchQuery.set(query);
  }

  toggleBrand(brand: string) {
    this._brands.update((brands) => {
      const index = brands.indexOf(brand);
      if (index > -1) {
        // Remove if exists 
        return brands.filter((b) => b !== brand);
      } else {
        // Add if not exists
        return [...brands, brand];
      }
    });
  }

  toggleCategory(category: string) {
    this._categories.update((cats) => {
      const index = cats.indexOf(category);
      if (index > -1) {
        return cats.filter((c) => c !== category);
      } else {
        return [...cats, category];
      }
    });
  }

  toggleSize(size: string) {
    this._sizes.update((sizes) => {
      const index = sizes.indexOf(size);
      if (index > -1) {
        return sizes.filter((s) => s !== size);
      } else {
        return [...sizes, size];
      }
    });
  }

  setPriceRange(range: PriceRange) {
    this._priceRange.set(range);
  }

  setMinRating(rating: number) {
    this._minRating.update((current) => {
      // If clicking the same rating, unselect it 
      return current === rating ? null : rating;
    });
  }

  setSortBy(sort: SortOption) {
    this._sortBy.set(sort);
  }

  resetFilters() {
    this._searchQuery.set('');
    this._brands.set([]);
    this._categories.set([]);
    this._sizes.set([]);
    this._minRating.set(null);
    this._priceRange.set({ min: 0, max: 20000 });
    this._sortBy.set(null);
  }
}
