import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Features } from '../../components/features/features.component';
import { ProductFaq } from '../../components/product-faq/product-faq.component';

@Component({
  selector: 'home',
  imports: [Features, ProductFaq],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
