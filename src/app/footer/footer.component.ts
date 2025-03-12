import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  faGithub,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: false,

  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  faGithub = faGithub;
  faLinkedin = faLinkedinIn;
  faTwitter = faTwitter;
  @ViewChild('contactForm', { static: false }) contactForm!: ElementRef;

  constructor(private router: Router) {}
  scrollToContact(type: any) {
    if (type == 'contact') {
      const element = document.querySelector('#contactForm');
      if (element) {
        (element as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      } else {
        this.router.navigate(['/HOME']).then(() => {
          // Listen for the navigation to complete
          this.router.events.subscribe((event) => {
            const contact_element = document.querySelector('#contactForm');
            if (contact_element) {
              (contact_element as HTMLElement).scrollIntoView({
                behavior: 'smooth',
              });
            }
          });
        });
      }
    }
  }
}
