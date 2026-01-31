import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Features } from '../../components/features/features.component';
import { ProductFaq } from '../../components/product-faq/product-faq.component';
import { Carousel } from '../../components/carousel/carousel.component';

@Component({
  selector: 'home',
  imports: [Features, ProductFaq, Carousel],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
