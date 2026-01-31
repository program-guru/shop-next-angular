import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Contact } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'contact-us',
  imports: [Contact],
  templateUrl: './contact-us.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUs {}
