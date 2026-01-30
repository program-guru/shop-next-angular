import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../core/services/theme.service';

interface NavLinkItem {
  name: string;
  href: string;
}

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html', 
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  themeService = inject(ThemeService);

  readonly isMenuOpen = signal<boolean>(false);

  readonly links: NavLinkItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];


  toggleMenu(): void {
    this.isMenuOpen.update((prev) => !prev);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}