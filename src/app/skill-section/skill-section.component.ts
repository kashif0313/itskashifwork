import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
} from '@angular/core';
@Component({
  selector: 'app-skill-section',
  standalone: false,

  templateUrl: './skill-section.component.html',
  styleUrl: './skill-section.component.css',
})
export class SkillSectionComponent {
  skills = [
    {
      title: 'Flutter & Dart',
      description: 'Cross-platform App Development',
      progress: 90,
      icon: null,
      showDetails: false,
      detailDescription:
        'Skilled in Flutter and Dart for building performant and beautiful cross-platform mobile apps. Familiar with widget composition, theming, animations, and responsive UI development.',
      details: [
        {
          label: 'Flutter',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
          svg: null,
        },
        {
          label: 'Dart',
          icon: 'https://img.icons8.com/?size=100&id=7AFcZ2zirX6Y&format=png&color=000000',
          svg: null,
        },
        {
          label: 'Material Design',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg',
          svg: null,
        },
        {
          label: 'Responsive Layouts',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
          svg: null,
        },
      ],
    },
    {
      title: 'State Management',
      description: 'Cubit, Bloc, Providers, GetX',
      progress: 85,
      icon: null,
      showDetails: false,
      detailDescription:
        'Experience with multiple state management techniques in Flutter for scalable and maintainable app architecture, including Bloc, Cubit, Provider, and GetX.',
      details: [
        {
          label: 'Cubit / Bloc',
          icon: 'https://user-images.githubusercontent.com/8855632/87745093-a4ba4b80-c7b2-11ea-91da-10f7603f413c.png',
          svg: null,
        },
        {
          label: 'Provider',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
          svg: null,
        },
        {
          label: 'GetX',
          icon: 'https://RaudinMoreno.gallerycdn.vsassets.io/extensions/raudinmoreno/getxresources/0.1.4/1621268183098/Microsoft.VisualStudio.Services.Icons.Default',
          svg: null,
        },
      ],
    },
    {
      title: 'Backend & Realtime Services',
      description: 'Firebase, APIs, WebSockets',
      progress: 80,
      icon: null,
      showDetails: false,
      detailDescription:
        'Backend integration with Firebase, RESTful APIs, and WebSockets for real-time communication. Comfortable with Firestore, Auth, Cloud Functions, and data syncing.',
      details: [
        {
          label: 'Firebase',
          icon: 'https://img.icons8.com/?size=100&id=87330&format=png&color=000000',
          svg: null,
        },
        {
          label: 'APIs Integration',
          icon: 'https://img.icons8.com/?size=100&id=FvL1M3GmkDyL&format=png&color=000000',
          svg: null,
        },
        {
          label: 'WebSockets',
          icon: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000',
          svg: null,
        },
        {
          label: 'Push Notifications',
          icon: 'https://img.icons8.com/?size=100&id=CYF3emOe7WBn&format=png&color=000000',
          svg: null,
        },
      ],
    },
    {
      title: 'DevOps & Version Control',
      description: 'Git, GitHub Actions, CI/CD',
      progress: 75,
      icon: null,
      showDetails: false,
      detailDescription:
        'Familiar with version control using Git and GitHub. Implemented CI/CD pipelines using GitHub Actions to automate testing and deployment.',
      details: [
        {
          label: 'Git',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
          svg: null,
        },
        {
          label: 'GitHub',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
          svg: null,
        },
        {
          label: 'GitHub Actions',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
          svg: null,
        },
        {
          label: 'CI/CD',
          icon: 'https://img.icons8.com/?size=100&id=110801&format=png&color=000000',
          svg: null,
        },
      ],
    },
    {
      title: 'Testing',
      description: 'Integration & Widget Testing',
      progress: 70,
      icon: null,
      showDetails: false,
      detailDescription:
        'Proficient in writing integration and widget tests to ensure app quality and stability, using Flutter’s built-in testing frameworks and best practices.',
      details: [
        {
          label: 'Integration Testing',
          icon: 'https://img.icons8.com/?size=100&id=5wGnhtHODuE9&format=png&color=000000',
          svg: null,
        },
        {
          label: 'Widget Testing',
          icon: 'https://img.icons8.com/?size=100&id=IEdNWp2O7ZdQ&format=png&color=000000',
          svg: null,
        },
      ],
    },
  ];

  @ViewChildren('card') cards!: QueryList<ElementRef>;
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            } else {
              entry.target.classList.remove('in-view');
            }
          });
        },
        { threshold: 0.3 }
      );

      this.cards.forEach((card) => {
        observer.observe(card.nativeElement);
      });
    }
  }

  isSmallScreen = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.isSmallScreen = window.innerWidth < 768; // Small screens (<768px)
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isSmallScreen = window.innerWidth < 768;
    }
  }
}
