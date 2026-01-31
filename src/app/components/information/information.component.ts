import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'component-information',
  templateUrl: './information.component.html',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Information {}
