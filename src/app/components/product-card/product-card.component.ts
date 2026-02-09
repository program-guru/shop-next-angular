import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'component-product-card',
  templateUrl: './product-card.component.html',
  imports: [CommonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  private router = inject(Router);
  private cartService = inject(CartService);
  private notificationService = inject(NotificationService);

  product = input.required<Product>();

  // Local State
  selectedSize = signal<string | null>(null);

  // Computed: Derive available sizes from stock object
  availableSizes = computed(() => {
    const stock = this.product().stock;
    return stock ? Object.keys(stock) : [];
  });

  // Actions
  handleSizeSelect(size: string, event: Event) {
    event.stopPropagation(); 
    this.selectedSize.update((prev) => (prev === size ? null : size));
  }

  handleAddToCart(event: Event) {
    event.stopPropagation(); 
    
    const size = this.selectedSize();
    const product = this.product(); 

    if (size && product) {
      this.cartService.addToCart(product, size);
      this.notificationService.show('Product added to cart');
    }
  }

  navigateToProduct() {
    this.router.navigate(['/products', this.product().id]);
  }
}