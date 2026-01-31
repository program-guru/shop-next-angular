import { Injectable, inject, signal } from '@angular/core';
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
}
