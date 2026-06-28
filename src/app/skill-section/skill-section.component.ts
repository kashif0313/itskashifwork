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
  skillsData = [
    {
      title: 'Programming & Scripting Languages',
      
      progress: 90,
      icon: null,
      showDetails: false,
      detailDescription:
        'Proficiency in various programming and scripting languages.',
      details: [
        {
          label: 'PHP',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
          svg: null,
        },
        {
          label: 'HTML',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
          svg: null,
        },
        {
          label: 'CSS',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
          svg: null,
        },
        {
          label: 'JavaScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
          svg: null,
        },
        {
          label: 'TypeScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
          svg: null,
        },
      ],
    },
    {
      title: 'Tools & Technologies',
      
      progress: 95,
      icon: null,
      showDetails: false,
      detailDescription: 'Expertise in various tools.',
      details: [
        {
          label: 'Node.js',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
          svg: null,
        },
        {
          label: 'Shopify',
          icon: 'https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-shopify-an-e-commerce-platform-that-helps-to-sell-online-logo-shadow-tal-revivo.png',
          svg: '',
        },
        {
          label: 'After ecffects',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg',
          svg: null,
        },
        {
          label: 'Photoshop',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
          svg: '',
        },
        {
          label: 'Illustrator',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg',
          svg: null,
        },
        {
          label: 'Primer Pro',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg',
          svg: '',
        },
      ],
    },
    {
      title: 'Frameworks / Libraries',
      
      progress: 90,
      icon: null,
      showDetails: false,
      detailDescription:
        'Experience with modern frameworks for web development.',
      details: [
        {
          label: 'Angular',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
          svg: null,
        },
        {
          label: 'Laravel',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
          svg: null,
        },
        {
          label: 'React',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
          svg: null,
        },
        {
          label: 'Livewire',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/livewire/livewire-original.svg',
          svg: null,
        },
        {
          label: 'Bootstrap',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
          svg: null,
        },
        {
          label: 'Tailwind CSS',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
          svg: null,
        },
      ],
    },

    {
      title: 'Database',
     
      progress: 95,
      icon: null,
      showDetails: false,
      detailDescription:
        'Expertise in various DBMS and cloud-based technologies.',
      details: [
        {
          label: 'AWS S3',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
          svg: null,
        },
        {
          label: 'Firebase',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
          svg: null,
        },
        {
          label: 'MongoDB',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg',
          svg: null,
        },
        {
          label: 'MySQL',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
          svg: '',
        },
      ],
    },
  ];

  
  // skills = [
  //   {
  //     label: 'PHP',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'HTML',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'CSS',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'JavaScript',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'TypeScript',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'Angular',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'Laravel',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'Node.js',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'Shopify',
  //     icon: 'https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-shopify-an-e-commerce-platform-that-helps-to-sell-online-logo-shadow-tal-revivo.png',
  //     svg: '',
  //   },
  //   {
  //     label: 'After ecffects',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'Photoshop',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
  //     svg: '',
  //   },
  //   {
  //     label: 'Illustrator',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'Primer Pro',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg',
  //     svg: '',
  //   },
  //   {
  //     label: 'AWS S3',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'Firebase',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'MongoDB',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg',
  //     svg: null,
  //   },
  //   {
  //     label: 'MySQL',
  //     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  //     svg: '',
  //   },
  // ];
}
