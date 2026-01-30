import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Features } from '../../components/features/features.component';

@Component({
  selector: 'home',
  imports: [Features],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
