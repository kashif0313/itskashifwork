import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  faFacebook,
  faGithub,
  faLinkedinIn,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';

interface SocialLink {
  id: string;
  username: string;
  Icon: IconDefinition;
  url: string;
}
@Component({
  selector: 'app-social-contact',
  standalone: false,

  templateUrl: './social-contact.component.html',
  styleUrl: './social-contact.component.css',
})
export class SocialContactComponent {
  faGithub = faGithub;
  faLinkedin = faLinkedinIn;
  faFacebook = faFacebook;

  socialLinks: SocialLink[] = [
    {
      id: 'github',
      username: 'kashif0313',
      Icon: this.faGithub,
      url: 'https://github.com/kashif0313',
    },
    {
      id: 'linkedin',
      username: '/in/KashifImran',
      Icon: this.faLinkedin,
      url: 'https://www.linkedin.com/in/kashif-imran-607091222/',
    },
    {
      id: 'facebook',
      username: 'ItsKashifWork',
      Icon: this.faFacebook,
      url: 'https://www.facebook.com/ItsKashifWork/',
    },
  ];

  accentColor = 'text-blue-600'; // example color class
  hoveredLinkId: string | null = null;

  handleMouseEnter(linkId: string) {
    this.hoveredLinkId = linkId;
  }

  handleMouseLeave() {
    this.hoveredLinkId = null;
  }
}
