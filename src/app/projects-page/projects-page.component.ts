import { Component, HostListener, OnInit } from '@angular/core';
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
  loadingMoreProjects = false;
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

  async loadMoreProjects() {
    if (this.loadingMoreProjects) return; // Prevent duplicate calls

    this.loadingMoreProjects = true;
    const newProjects = await this.helperFunction.getProjects(10, true);
    this.projects = [...this.projects, ...newProjects];
    this.loadingMoreProjects = false;
  }

  filterProjects(type: string) {
    this.projects = this.helperFunction.applyFilter(type);
  }

  openGithubLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // If user is near bottom (within 200px), load more projects
    if (scrollHeight - scrollTop - clientHeight < 200) {
      this.loadMoreProjects();
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
