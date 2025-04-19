import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: false,

  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent implements AfterViewInit, OnInit {
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  private words = ['Flutter Developer'];
  private typewriterElement: HTMLElement | null = null;
  bigScreen: boolean = false;

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  scrollToProjects() {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector('#projectSection');
      if (element) {
        (element as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  scrollToContacts() {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector('#contactForm');
      if (element) {
        (element as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  private checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.bigScreen = window.innerWidth > 1023;
      this.cdr.detectChanges(); // 👈 Force Angular to update view
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.typewriterElement = document.getElementById('typewriter');
      if (this.typewriterElement) {
        this.startTypewriterEffect(this.words, this.typewriterElement);
      }
    }
  }
  private startTypewriterEffect(words: string[], element: HTMLElement): void {
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = words[wordIndex];
      const visibleText = isDeleting
        ? currentWord.substring(0, letterIndex--)
        : currentWord.substring(0, letterIndex++);

      element.textContent = visibleText;

      if (!isDeleting && letterIndex === currentWord.length) {
        // Pause before deleting
        setTimeout(() => (isDeleting = true), 1000);
      } else if (isDeleting && letterIndex === 0) {
        // Move to the next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      const typingSpeed = isDeleting ? 50 : 100;
      setTimeout(type, typingSpeed);
    };

    type();
  }
}
