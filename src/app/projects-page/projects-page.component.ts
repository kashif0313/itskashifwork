import { Component, OnInit } from '@angular/core';
import { helperFunctions } from '../helpers/helperFunctions';

@Component({
  selector: 'app-projects-page',
  standalone: false,

  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
})
export class ProjectsPageComponent implements OnInit {
  projects: any = [];
  loading: boolean = true; // Track loading state

  constructor(private helperFunction: helperFunctions) {}
  async ngOnInit() {
    this.loading = true; // Start loading
    this.projects = await this.helperFunction.getProjects();
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
