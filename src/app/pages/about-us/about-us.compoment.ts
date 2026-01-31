import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Information } from '../../components/information/information.component';
import { Team } from '../../components/team/team.component';

@Component({
  selector: 'about-us',
  imports: [Information, Team],
  templateUrl: './about-us.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUs {}
