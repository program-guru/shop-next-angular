import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule, RouterLink, MatIconModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  cartService = inject(CartService);

  showAddress = signal(false);

  shipping = signal(0); 
  tax = computed(() => Math.round(this.cartService.totalPrice() * 0.02));
  grandTotal = computed(() => 
    this.cartService.totalPrice() + this.shipping() + this.tax()
  );

  toggleAddress() {
    this.showAddress.update((v) => !v);
  }

  // Helper to generate a range of numbers for the select dropdown
  quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  updateQuantity(productId: number, size: string, quantity: number) {
    this.cartService.updateQuantity(productId, size, quantity);
  }

  removeItem(productId: number, size: string) {
    this.cartService.removeFromCart(productId, size);
  }
}