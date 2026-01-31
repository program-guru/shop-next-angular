import { Component, ChangeDetectionStrategy, inject, viewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'component-contact-form',
  templateUrl: './contact-form.component.html',
  imports: [ReactiveFormsModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private fb = inject(FormBuilder);

  // ViewChild signals to access DOM elements for focus management
  nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  emailInput = viewChild<ElementRef<HTMLInputElement>>('emailInput');
  messageInput = viewChild<ElementRef<HTMLTextAreaElement>>('messageInput');

  // Define the form group with validators matching your React logic
  contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator]],
    email: ['', [Validators.required, Validators.email, this.noWhitespaceValidator]],
    message: ['', [Validators.required, Validators.minLength(10), this.noWhitespaceValidator]],
  });

  onSubmit() {
    // Mark all as touched so errors appear immediately if the user clicks submit empty
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.focusFirstError();
      return;
    }

    console.log('Form submitted:', this.contactForm.getRawValue());
    
    // Reset form and states
    this.contactForm.reset();
  }

  private noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  private focusFirstError() {
    if (this.contactForm.controls.name.invalid) {
      this.nameInput()?.nativeElement.focus();
      return;
    }
    if (this.contactForm.controls.email.invalid) {
      this.emailInput()?.nativeElement.focus();
      return;
    }
    if (this.contactForm.controls.message.invalid) {
      this.messageInput()?.nativeElement.focus();
      return;
    }
  }
}