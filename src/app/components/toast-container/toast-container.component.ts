import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { Toast } from '../toast/toast.component';

@Component({
  selector: 'component-toast-container',
  standalone: true,
  imports: [CommonModule, Toast],
  templateUrl: './toast-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainer {
  notificationService = inject(NotificationService);
}