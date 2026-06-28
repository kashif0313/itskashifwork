import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { helperFunctions } from '../helpers/helperFunctions';

@Component({
  selector: 'app-clients',
  standalone: false,

  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit, AfterViewInit {
  loading: boolean = true;

  clients: any[] = [];
  extendedClients: any[] = [];
  activeIndex = 0;
  cardWidth = 550 + 24;
  dynaicWidth: string = '550px'; // default desktop width

  translateX = 0;
  // const cardWidth = 550 + 24; // 550px card + 24px gap

  constructor(
    private helperFunction: helperFunctions,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}
  setDynamicWidth() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.dynaicWidth = window.innerWidth < 768 ? '300px' : '550px';
    this.cardWidth = Number(this.dynaicWidth.replace(/\D/g, '')) + 24;
  }
  async ngOnInit() {
    const original = await this.helperFunction.getClients();
    this.setDynamicWidth();
    this.loading = false;

    if (original.length > 0) {
      // Create a long repeated list (100 loops = infinite feel)
      for (let i = 0; i < 100; i++) {
        this.extendedClients.push(...original);
      }

      this.startAutoSlide();
    }

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', () => {
        this.setDynamicWidth();
      });
    }
  }

  centerInitialCard() {
    const numericValue = Number(this.dynaicWidth.replace(/\D/g, ''));

    // Move slider so first card is centered
    this.translateX = -(this.activeIndex * numericValue);
  }

  startAutoSlide() {
    if (!isPlatformBrowser(this.platformId)) return;
    setInterval(() => {
      this.activeIndex++;

      const screenCenterOffset = window.innerWidth / 2 - this.cardWidth / 2;

      this.translateX = screenCenterOffset - this.activeIndex * this.cardWidth;

      // Infinite loop fix
      if (this.activeIndex > this.extendedClients.length - 10) {
        this.activeIndex = Math.floor(this.extendedClients.length / 2);

        this.translateX =
          screenCenterOffset - this.activeIndex * this.cardWidth;
      }
    }, 3000);
  }
  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    window.addEventListener('resize', () => {
      const screenCenterOffset = window.innerWidth / 2 - this.cardWidth / 2;

      this.translateX = screenCenterOffset - this.activeIndex * this.cardWidth;
    });
  }
}
