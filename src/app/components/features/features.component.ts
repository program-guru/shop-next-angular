import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 

interface Feature {
  icon: string; 
  title: string;
  description: string;
}

@Component({
  selector: 'component-features',
  templateUrl: './features.component.html',
  imports: [MatIconModule], 
})
export class Features {
  protected featuresData: Feature[] = [
    {
      icon: 'flash_on', 
      title: 'Ultra-light Performance',
      description: 'Engineered for speed with breathable, lightweight materials.',
    },
    {
      icon: 'directions_walk',
      title: 'All-day Comfort Fit',
      description: 'Ergonomic cushioning designed for long wear without fatigue.',
    },
    {
      icon: 'verified_user', 
      title: 'Premium Build Quality',
      description: 'Durable materials tested for everyday and athletic use.',
    },
    {
      icon: 'local_shipping', 
      title: 'Fast & Free Delivery',
      description: 'Quick doorstep delivery with easy returns and exchanges.',
    },
  ];
}