import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'theme-toggle',
  imports: [CommonModule, MatIconModule],
  templateUrl: './theme-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggle {
  themeService = inject(ThemeService);
}
