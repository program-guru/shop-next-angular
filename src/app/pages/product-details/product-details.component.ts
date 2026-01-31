import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  imports: [CommonModule, RouterLink, MatIconModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetails {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private location = inject(Location);

  id = input.required<string>();

  product = computed(() => {
    const productId = Number(this.id());
    return this.productService.products().find((p) => p.id === productId);
  });

  activeImage = signal<string>('');
  selectedSize = signal<string | null>(null);
  sizeError = signal(false);

  sizes = computed(() => {
    const p = this.product();
    return p?.stock ? Object.keys(p.stock) : [];
  });

  constructor() {
    // Reset state whenever the product ID changes
    effect(
      () => {
        const product = this.product();

        // Set default image to the new product's main image
        if (product) {
          this.activeImage.set(product.mainImage);
        }

        // Reset other selections
        this.selectedSize.set(null);
        this.sizeError.set(false);
      }
    );
  }

  goBack() {
    this.location.back();
  }

  setActiveImage(img: string) {
    this.activeImage.set(img);
  }

  selectSize(size: string) {
    this.selectedSize.update((curr) => (curr === size ? null : size));
    this.sizeError.set(false);
  }

  handleAddToCart(): boolean {
    const product = this.product();
    const size = this.selectedSize();

    if (!product) return false;

    // Validation
    if (this.sizes().length > 0 && !size) {
      this.sizeError.set(true);
      setTimeout(() => this.sizeError.set(false), 3000);
      return false;
    }

    // Add to Cart
    this.cartService.addToCart(product, size || '');

    // Reset selection
    this.selectedSize.set(null);
    return true;
  }

  handleBuyNow() {
    if (this.handleAddToCart()) {
      this.router.navigate(['/cart']);
    }
  }
}
