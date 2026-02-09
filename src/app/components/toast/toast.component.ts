import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../core/services/notification.service';
import { Notification } from '../../core/models/notification.model';

@Component({
  selector: 'component-toast',
  templateUrl: './toast.component.html',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);

  notification = input.required<Notification>();
  isExiting = signal(false);
  private timer: any;

  ngOnInit() {
    // Start the auto-dismiss timer
    if (this.notification().duration) {
      this.timer = setTimeout(() => {
        this.handleDismiss();
      }, this.notification().duration);
    }
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }

  handleDismiss() {
    // Trigger exit animation
    this.isExiting.set(true);

    // Wait for animation to finish
    setTimeout(() => {
      this.notificationService.remove(this.notification().id);
    }, 300);
  }
}