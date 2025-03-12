import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  faFacebook,
  faGithub,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-social-contact',
  standalone: false,

  templateUrl: './social-contact.component.html',
  styleUrl: './social-contact.component.css',
})
export class SocialContactComponent {
  faGithub = faGithub;
  faLinkedin = faLinkedinIn;
  faTwitter = faFacebook;

  githubUsername = 'kashif0313';
  linkedinUsername = 'Kashif';
  facebookUsername = 'ItsKashifWork';

  @Input() verticalShow: boolean = false;
}
