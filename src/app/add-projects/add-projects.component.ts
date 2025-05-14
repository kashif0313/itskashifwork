import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { serverTimestamp } from 'firebase/firestore';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-projects',
  standalone: false,
  templateUrl: './add-projects.component.html',
  styleUrl: './add-projects.component.css',
})
export class AddProjectsComponent implements OnInit {
  project = {
    title: '',
    description: '',
    imageUrl: '',
    androidLink: '',
    iosLink: '',
    timestamp: serverTimestamp(), // Firebase server timestamp
  };

  secretKey = 'us@ma0313@li';
  inputKey: any;
  ngOnInit(): void {}
  successMessage: string = '';
  errorMessage: string = '';

  isTitleInvalid: boolean = false;
  isDescriptionInvalid: boolean = false;
  isWebLinkInvalid: boolean = false;
  isGithubLinkInvalid: boolean = false;
  isTypeInvalid: boolean = false;

  projectImagePreview: string | null = null;

  private firestore: Firestore = inject(Firestore);

  async onSubmit() {
    this.isTitleInvalid = !this.project.title.trim();
    this.isDescriptionInvalid = !this.project.description.trim();
    this.isWebLinkInvalid = !this.project.androidLink.trim();
    this.isGithubLinkInvalid = !this.project.iosLink.trim();
    if (
      this.isTitleInvalid ||
      this.isDescriptionInvalid ||
      this.isTypeInvalid
    ) {
      this.errorMessage = '⚠️ Please fill in all required fields.';
      return;
    }

    if (this.inputKey !== this.secretKey) {
      this.errorMessage = '❌ Invalid secret key!';
      return;
    }

    try {
      const projectCollection = collection(this.firestore, 'Projects');
      this.project.imageUrl =
        'https://ali-usama.infy.uk/uploads/' + this.project.imageUrl;
      await addDoc(projectCollection, this.project);

      this.successMessage = '✅ Project added successfully!';
      this.errorMessage = '';

      this.project = {
        title: '',
        description: '',
        imageUrl: '',
        androidLink: '',
        iosLink: '',
        timestamp: serverTimestamp(),
      };

      this.isTitleInvalid = false;
      this.isDescriptionInvalid = false;
      // this.isWebLinkInvalid = false;
      // this.isGithubLinkInvalid = false;
      this.isTypeInvalid = false;
      this.projectImagePreview = null;

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } catch (error) {
      this.errorMessage = '❌ Failed to add project. Please try again.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  }
}
