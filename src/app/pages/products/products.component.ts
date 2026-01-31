import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilterSidebar } from '../../components/filter-sidebar/filter-sidebar.component';

@Component({
  selector: 'component-products',
  imports: [FilterSidebar],
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products {}
