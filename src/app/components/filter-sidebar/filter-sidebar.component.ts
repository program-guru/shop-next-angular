import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FilterService } from '../../core/services/filter.service';
import { ProductService } from '../../core/services/product.service';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { SortOption } from '../../core/models/filter.model';

@Component({
  selector: 'component-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSidebar implements OnInit, OnDestroy {
  // Services
  protected filterService = inject(FilterService);
  protected productService = inject(ProductService);

  // Constants
  readonly MIN_PRICE = 0;
  readonly MAX_PRICE = 20000;

  // Local UI State
  isOpen = signal(false);
  hoverRating = signal<number | null>(null);

  // Reactive Forms for Debounced Inputs
  searchControl = new FormControl('');
  priceMinControl = new FormControl(this.MIN_PRICE);
  priceMaxControl = new FormControl(this.MAX_PRICE);

  private subs = new Subscription();

  // --- Computed Sorted Lists (Selected items move to top) ---

  sortedBrands = computed(() => {
    return this.sortChips(this.productService.brands(), this.filterService.brands());
  });

  sortedCategories = computed(() => {
    return this.sortChips(this.productService.categories(), this.filterService.categories());
  });

  // Helper function to sort selected items to top
  private sortChips(items: string[], selected: string[]) {
    return [...items].sort((a, b) => {
      const aSelected = selected.includes(a);
      const bSelected = selected.includes(b);
      if (aSelected === bSelected) return a.localeCompare(b);
      return aSelected ? -1 : 1;
    });
  }

  ngOnInit() {
    // Sync Search Input (Debounced)
    this.subs.add(
      this.searchControl.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((val) => {
          this.filterService.setSearchQuery(val || '');
        }),
    );

    // Sync Price Slider (Debounced)
    this.subs.add(
      this.priceMinControl.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((val) => this.updatePriceRange()),
    );

    this.subs.add(
      this.priceMaxControl.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((val) => this.updatePriceRange()),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  toggleSidebar() {
    this.isOpen.update((v) => !v);
  }

  handleMinPriceChange(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    const currentMax = this.priceMaxControl.value || this.MAX_PRICE;
    // Prevent crossing
    const newValue = Math.min(value, currentMax - 500);
    this.priceMinControl.setValue(newValue, { emitEvent: true });
  }

  handleMaxPriceChange(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    const currentMin = this.priceMinControl.value || this.MIN_PRICE;
    // Prevent crossing
    const newValue = Math.max(value, currentMin + 500);
    this.priceMaxControl.setValue(newValue, { emitEvent: true });
  }

  private updatePriceRange() {
    this.filterService.setPriceRange({
      min: this.priceMinControl.value || 0,
      max: this.priceMaxControl.value || this.MAX_PRICE,
    });
  }

  handleSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filterService.setSortBy((value as SortOption) || null);
  }

  handleReset() {
    this.filterService.resetFilters();
    this.searchControl.setValue('');
    this.priceMinControl.setValue(this.MIN_PRICE, { emitEvent: false });
    this.priceMaxControl.setValue(this.MAX_PRICE, { emitEvent: false });
  }
}
