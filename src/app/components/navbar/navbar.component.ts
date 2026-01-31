import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../core/services/theme.service';
import { ThemeToggle } from '../theme-toggle/theme-toggle.component';

interface NavLinkItem {
  name: string;
  href: string;
}

@Component({
  selector: 'component-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule, ThemeToggle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
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
