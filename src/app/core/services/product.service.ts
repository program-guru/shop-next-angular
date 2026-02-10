import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { FilterService } from './filter.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private filterService = inject(FilterService);

  // --- Core State ---
  private _products = signal<Product[]>([]);
  readonly products = this._products.asReadonly();

  readonly isLoading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.http.get<Product[]>('data/products.json').subscribe({
      next: (data) => {
        this._products.set(data);
        this.isLoading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this._products.set([]);
        this.isLoading.set(false);
        this.error.set('Failed to load products');
      },
    });
  }

  // --- Derived State ---

  readonly brands = computed(() => {
    const brands = new Set(this.products().map((p) => p.brand));
    return Array.from(brands).sort();
  });

  readonly categories = computed(() => {
    const categories = new Set(this.products().flatMap((p) => p.category));
    return Array.from(categories).sort();
  });

  readonly sizes = computed(() => {
    const products = this.products();
    const allSizes = products.flatMap((p) => (p.stock ? Object.keys(p.stock) : []));
    const uniqueSizes = [...new Set(allSizes)];

    return uniqueSizes.sort((a, b) => {
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      // If both are numbers, sort numerically (e.g., 6, 7, 8, 9, 10)
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      // Otherwise use string comparison (e.g., L, M, S, XL)
      return a.localeCompare(b);
    });
  });

  // --- The Filtered Products Logic ---
  readonly filteredProducts = computed(() => {
    // Read all dependency signals
    const products = this.products();
    const filters = {
      searchQuery: this.filterService.searchQuery(),
      brands: this.filterService.brands(),
      categories: this.filterService.categories(),
      sizes: this.filterService.sizes(),
      minRating: this.filterService.minRating(),
      priceRange: this.filterService.priceRange(),
      sortBy: this.filterService.sortBy(),
    };

    // Filter
    let result = products.filter((product) => {
      // 1. Search Query (Name, Description, OR Brand)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);

        if (!matchName && !matchDesc && !matchBrand) return false;
      }

      // Brands
      if (filters.brands.length > 0) {
        if (!filters.brands.includes(product.brand)) return false;
      }

      // Categories
      if (filters.categories.length > 0) {
        const hasCategory = product.category.some((cat) => filters.categories.includes(cat));
        if (!hasCategory) return false;
      }

      // Price Range
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }

      // Rating
      if (filters.minRating !== null) {
        if (product.rating < filters.minRating) return false;
      }

      // Sizes
      if (filters.sizes.length > 0) {
        if (!product.stock) return false; // Safety check

        const hasSize = filters.sizes.some((size) => {
          const stockCount = product.stock[size];
          return stockCount && stockCount > 0;
        });

        if (!hasSize) return false;
      }

      return true;
    });

    // Sorting
    if (filters.sortBy) {
      result = [...result].sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating-desc':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    }

    return result;
  });
}
