import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'portfolioV2';
  circleProgress = 'conic-gradient(#566FC8 0%, transparent 0%)';
  topBtnOpacity = 0; // Initial opacity for the top butto
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    this.updateCircleProgress(); // Initialize progress
  }

  // Scroll Listener
  @HostListener('window:scroll', [])
  onScroll() {
    this.updateCircleProgress();
  }

  // Update circular progress based on scroll position
  updateCircleProgress() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      // Update the progress as a circular background gradient
      this.circleProgress = `conic-gradient(#566FC8 ${scrollPercent}%, transparent ${scrollPercent}%)`;
      this.topBtnOpacity = scrollTop > 100 ? 1 : 0;
    }
  }

  // Smooth scroll to the top
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
