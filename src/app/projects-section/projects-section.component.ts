import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { helperFunctions } from '../helpers/helperFunctions';

@Component({
  selector: 'app-projects-section',
  standalone: false,

  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css',
})
export class ProjectsSectionComponent implements OnInit {
  projects: any = [];
  loading: boolean = true; // Track loading state

  constructor(private helperFunction: helperFunctions) {}
  async ngOnInit() {
    this.loading = true; // Start loading
    this.projects = (await this.helperFunction.getProjects()).slice(0, 8);
    this.loading = false; // Stop loading after fetching data
  }

  openPreviewLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }

  filterProjects(type: string) {
    this.projects = this.helperFunction.applyFilter(type);
  }

  openGithubLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }
}
