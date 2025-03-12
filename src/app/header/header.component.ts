import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  theme: string | null = 'light'; // Default to light theme
  isDarkMode: boolean = false; // Track the theme mode
  isNavbarOpen = false;

  @ViewChild('contactForm', { static: false }) contactForm!: ElementRef;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.applySavedTheme();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isNavbarOpen = false;
      }
    });
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
    console.log('click header');
  }
  scrollToContact(type: any) {
    if (type == 'contact') {
      const element = document.querySelector('#contactForm');
      if (element) {
        (element as HTMLElement).scrollIntoView({ behavior: 'smooth' });
        this.isNavbarOpen = false;
      } else {
        this.router.navigate(['/home']).then(() => {
          // Listen for the navigation to complete
          this.router.events.subscribe((event) => {
            const contact_element = document.querySelector('#contactForm');
            if (contact_element) {
              this.isNavbarOpen = false;
              (contact_element as HTMLElement).scrollIntoView({
                behavior: 'smooth',
              });
            }
          });
        });
      }
    }
  }

  ngAfterViewInit(): void {
    this.applySavedTheme();
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      this.isDarkMode = !this.isDarkMode;

      if (this.isDarkMode) {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }

      this.cdr.detectChanges(); // Force Angular to update UI
    }
  }

  applySavedTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const htmlElement = document.documentElement; // Get <html> tag

      if (savedTheme === 'dark') {
        this.isDarkMode = true;
        htmlElement.classList.add('dark');
      } else {
        this.isDarkMode = false;
        htmlElement.classList.remove('dark');
      }
    }
  }
}
