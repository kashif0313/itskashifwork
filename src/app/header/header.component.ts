import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router) {}
  menuIcon = faBars;
  isMenuOpen = false;
  @Input() ts: any = {
    headerBg: 'bg-gray-900',
    accentColor: 'text-cyan-400',
    textPrimary: 'text-white',
  };
  sections = [
    { id: 'home', title: 'Home' },
    { id: 'skills', title: 'Skills' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
    { id: 'testimonials', title: 'Testimonials' },
  ];

  scrollTo(sectionId: string) {
    const isHome = this.router.url === '/' || this.router.url === '/home';

    if (isHome) {
      // Already on home → scroll directly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Not on home → navigate first, then scroll
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300); // delay for DOM to load
      });
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  onMobileClick(sectionId: string) {
    this.scrollTo(sectionId);
    this.isMenuOpen = false;
  }
}
