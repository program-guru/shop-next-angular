import { Injectable, signal, computed, effect, Injector } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _items = signal<CartItem[]>(this.loadFromStorage());

  readonly items = this._items.asReadonly();
  readonly totalItems = computed(() =>
    this._items().reduce((acc, item) => acc + Number(item.quantity), 0),
  );
  readonly totalPrice = computed(() =>
    this._items().reduce((acc, item) => acc + item.product.price * Number(item.quantity), 0),
  );

  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this._items()));
    });
  }

  addToCart(product: Product, size: string) {
    this._items.update((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => item.product.id === product.id && item.size === size,
      );

      if (existingItemIndex > -1) {
        const newItems = [...currentItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: Number(newItems[existingItemIndex].quantity) + 1,
        };
        return newItems;
      } else {
        return [...currentItems, { product, size, quantity: 1 }];
      }
    });
  }

  removeFromCart(productId: number, size: string) {
    this._items.update((items) =>
      items.filter((item) => !(item.product.id === productId && item.size === size)),
    );
  }

  updateQuantity(productId: number, size: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId, size);
      return;
    }

    this._items.update((items) =>
      items.map((item) =>
        item.product.id === productId && item.size === size ? { ...item, quantity } : item,
      ),
    );
  }

  clearCart() {
    this._items.set([]);
  }

  private loadFromStorage(): CartItem[] {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          const items = JSON.parse(stored);
          return items.map((item: CartItem) => ({
            ...item,
            quantity: Number(item.quantity),
          }));
        } catch (e) {
          console.error('Failed to parse cart', e);
          return [];
        }
      }
    }
    return [];
  }
}
