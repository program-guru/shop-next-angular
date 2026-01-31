import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

@Component({
  selector: 'component-team',
  templateUrl: './team.component.html',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Team {
  teamMembers: TeamMember[] = [
    {
      name: 'Aaditya Mall',
      role: 'Product Design',
      image: '/Team/aaditya_profile.jpeg',
    },
    {
      name: 'Shivam Kulkarni',
      role: 'Engineering',
      image: '/Team/shivam_profile.jpg',
    },
    {
      name: 'Mansi Chudasama',
      role: 'Marketing & Growth',
      image: '/Team/mansi_profile.png',
    },
  ];
}
