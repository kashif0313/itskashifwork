import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
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
    webLink: '',
    githubLink: '',
    type: '',
  };

  secretKey = 'k@$hif0313';
  inputKey: any;
  ngOnInit(): void {}
  successMessage: string = '';
  errorMessage: string = '';

  isTitleInvalid: boolean = false;
  isDescriptionInvalid: boolean = false;
  isImageUrlInvalid: boolean = false;
  isWebLinkInvalid: boolean = false;
  isGithubLinkInvalid: boolean = false;
  isTypeInvalid: boolean = false;

  uploadFile: File | null = null;
  projectImagePreview: string | null = null;

  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);

  onFileSelected(event: any) {
    this.uploadFile = event.target.files[0];
    if (this.uploadFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.projectImagePreview = e.target.result; // Store Base64 preview URL
      };
      reader.readAsDataURL(this.uploadFile);
    }
  }

  async onSubmit() {
    this.isTitleInvalid = !this.project.title.trim();
    this.isDescriptionInvalid = !this.project.description.trim();
    this.isWebLinkInvalid = !this.project.webLink.trim();
    this.isGithubLinkInvalid = !this.project.githubLink.trim();
    this.isTypeInvalid = !this.project.type.trim();

    if (
      this.isTitleInvalid ||
      this.isDescriptionInvalid ||
      this.isTypeInvalid
    ) {
      this.errorMessage = '⚠️ Please fill in all required fields.';
      return;
    }

    if (!this.uploadFile) {
      this.errorMessage = '⚠️ Please select an image file.';
      return;
    }

    if (this.inputKey !== this.secretKey) {
      this.errorMessage = '❌ Invalid secret key!';
      return;
    }

    try {
      const imageUrl = await this.uploadImageAsPromise(this.uploadFile);
      this.project.imageUrl = imageUrl;

      const projectCollection = collection(this.firestore, 'Projects');
      await addDoc(projectCollection, this.project);

      this.successMessage = '✅ Project added successfully!';
      this.errorMessage = '';

      this.project = {
        title: '',
        description: '',
        imageUrl: '',
        webLink: '',
        githubLink: '',
        type: '',
      };

      this.isTitleInvalid = false;
      this.isDescriptionInvalid = false;
      // this.isWebLinkInvalid = false;
      // this.isGithubLinkInvalid = false;
      this.isTypeInvalid = false;
      this.uploadFile = null;
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

  uploadImageAsPromise(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const storagePath = `projects/${Date.now()}_${file.name}`;
      const storageRef = ref(this.storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error.message);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }
}
