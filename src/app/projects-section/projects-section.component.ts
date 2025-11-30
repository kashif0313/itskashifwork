import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { helperFunctions } from '../helpers/helperFunctions';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  webLink?: string;
  githubLink?: string;
  category: string;
  type: string;
  techStack?: string[];
}
@Component({
  selector: 'app-projects-section',
  standalone: false,

  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css',
})
export class ProjectsSectionComponent implements OnInit {
  projects: any = [];
  // loading: boolean = true; // Track loading state
  openDetails: boolean = false;
  openProjectDetail: any;
  faGithub = faGithub;

  constructor(private helperFunction: helperFunctions) {}
  async ngOnInit() {
    this.loading = true; // Start loading
    this.projects = await this.helperFunction.getProjects(8);
    this.loading = false; // Stop loading after fetching data
    this.filteredProjects = this.projects;
    setTimeout(() => (this.loading = false), 1000);
  }
  imageLoaded: { [key: string]: boolean } = {};

  onImageLoad(event: Event, projectId: number) {
    this.imageLoaded[projectId] = true;
    const img = event.target as HTMLImageElement;
    img.classList.remove('lazy-img');
    img.classList.add('lazy-img-loaded');
  }
  getProjectType(type: string) {
    if (type == 'web') {
      return 'Web Development';
    }
    if (type == 'graphic') {
      return 'Graphic Design';
    }
    return;
  }
  openDetailsModal(project: any) {
    this.openDetails = true;
    this.openProjectDetail = project;
  }

  closeDetailsModal() {
    this.openDetails = false;
  }

  activeFilter: string = 'All';
  filteredProjects: Project[] = [];
  loading: boolean = true;

  filterProjects(category: string) {
    this.activeFilter = category;

    if (category === 'All') {
      this.filteredProjects = this.projects;
      console.log('filterData All== ', this.filteredProjects);
    } else {
      this.filteredProjects = this.projects.filter((p: any) => {
        console.log('filterData == ', p.type);
        if (category == 'Web Apps') {
          return p.type === 'web';
        }
        if (category == 'Graphic Design') {
          return p.type === 'graphic';
        }
        return false;
      });
    }
  }

  openPreviewLink(url: string) {
    window.open(url, '_blank');
  }

  openGithubLink(url: string) {
    window.open(url, '_blank');
  }
}
