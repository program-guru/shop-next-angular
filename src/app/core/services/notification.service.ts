import { Injectable, signal } from '@angular/core';
import { Notification, NotificationType } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifications = signal<Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  // Show a notification
  show(message: string, type: NotificationType = 'info', duration: number = 3000) {
    const id = crypto.randomUUID(); 
    const newNotification: Notification = { id, message, type, duration };

    // Add to the list 
    this._notifications.update(current => [newNotification, ...current]);
  }

  // Remove a specific notification
  remove(id: string) {
    this._notifications.update(current => 
      current.filter(n => n.id !== id)
    );
  }

  // Clear all notifications
  clear() {
    this._notifications.set([]);
  }
}