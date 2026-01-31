import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service'; 

@Component({
  selector: 'component-footer',
  templateUrl: './footer.component.html', 
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  themeService = inject(ThemeService);

  protected links = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  protected currentYear = signal(new Date().getFullYear());
}