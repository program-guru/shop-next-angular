import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FilterSidebar } from '../../components/filter-sidebar/filter-sidebar.component';
import { ProductCard } from '../../components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FilterSidebar, ProductCard, MatIconModule],
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products {
  protected productService = inject(ProductService);
}
