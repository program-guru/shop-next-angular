import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  // Private writable signal
  private _products = signal<Product[]>([]);

  // Public read-only signal
  readonly products = this._products.asReadonly();

  constructor() {
    this.http.get<Product[]>('data/products.json').subscribe({
      next: (data) => {
        this._products.set(data);
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this._products.set([]);
      },
    });
  }

  readonly brands = computed(() => {
    const brands = new Set(this.products().map((p) => p.brand));
    return Array.from(brands).sort();
  });

  readonly categories = computed(() => {
    const categories = new Set(this.products().flatMap((p) => p.category));
    return Array.from(categories).sort();
  });

  readonly sizes = computed(() => {
    const sizes = new Set(this.products().flatMap((p) => Object.keys(p.stock)));
    return Array.from(sizes).sort();
  });
}