import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-project-details',
  standalone: false,
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent {
  @Output() confirmAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() projectDetails: any;
  closeModal() {
    this.confirmAction.emit();
  }

  openPreviewLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }
  openGithubLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }
}
