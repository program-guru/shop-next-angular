import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'component-product-faq',
  templateUrl: './product-faq.component.html',
  imports: [MatIconModule], 
})
export class ProductFaq {
  protected openIndex = signal<number | null>(null);

  protected faqs: FAQ[] = [
    {
      question: 'Are these shoes true to size?',
      answer:
        'Yes. Our shoes follow standard sizing. If you are between sizes, we recommend choosing the larger size for optimal comfort.',
    },
    {
      question: 'What materials are used?',
      answer:
        'We use premium breathable mesh, durable rubber soles, and cushioned midsoles designed for all-day comfort and longevity.',
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Orders are typically delivered within 3-5 business days. Express shipping options are available at checkout.',
    },
    {
      question: 'What is the return policy?',
      answer:
        'You can return or exchange unworn shoes within 14 days of delivery. Items must be in original packaging.',
    },
    {
      question: 'How should I care for my shoes?',
      answer:
        'Clean using a soft brush or cloth. Avoid machine washing and prolonged exposure to water to maintain durability.',
    },
  ];

  protected toggleFaq(index: number): void {
    this.openIndex.update((currentOpenIndex) =>
      currentOpenIndex === index ? null : index
    );
  }
}