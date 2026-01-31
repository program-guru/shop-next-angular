import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'component-carousel',
  templateUrl: './carousel.component.html',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  featuredProducts = computed(() => {
    const products: Product[] = this.productService.products();
    return products.filter((product) => product.isFeatured == true);
  });
  autoSlideInterval = signal<number>(3000);

  currentIndex = signal(0);

  currentProduct = computed(() => {
    const products = this.featuredProducts();
    return products.length > 0 ? products[this.currentIndex()] : null;
  });

  private intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  nextSlide(): void {
    this.currentIndex.update((prev) => (prev + 1) % this.featuredProducts().length);
  }

  prevSlide(): void {
    this.currentIndex.update((prev) =>
      prev === 0 ? this.featuredProducts().length - 1 : prev - 1,
    );
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
  }

  navigateToProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  startAutoSlide(): void {
    if (isPlatformBrowser(this.platformId) && !this.intervalId) {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, this.autoSlideInterval());
    }
  }

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
