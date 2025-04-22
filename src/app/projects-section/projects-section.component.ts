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
  openDetails: boolean = false;
  openProjectDetail: any;

  constructor(private helperFunction: helperFunctions) {}
  async ngOnInit() {
    this.loading = true; // Start loading
    this.projects = await this.helperFunction.getProjects(8);
    this.loading = false; // Stop loading after fetching data
  }
  openPreviewLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }

  filterProjects(type: string) {
    console.log('filter type == ', type);
    this.projects = this.helperFunction.applyFilter(type);
    console.log('proj ==', this.projects);
  }

  openGithubLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }
  openDetailsModal(project: any) {
    this.openDetails = true;
    this.openProjectDetail = project;
  }

  closeDetailsModal() {
    this.openDetails = false;
  }
}
