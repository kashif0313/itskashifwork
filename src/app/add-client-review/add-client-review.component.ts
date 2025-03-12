import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-client-review',
  standalone: false,
  templateUrl: './add-client-review.component.html',
  styleUrl: './add-client-review.component.css',
})
export class AddClientReviewComponent implements OnInit {
  review = {
    name: '',
    review: '',
  };
  successMessage: string = '';
  errorMessage: string = '';
  isNameInvalid: boolean = false;
  isReviewInvalid: boolean = false;

  private firestore: Firestore = inject(Firestore);

  ngOnInit(): void {}

  onSubmit() {
    // Check for empty fields
    this.isNameInvalid = !this.review.name.trim();
    this.isReviewInvalid = !this.review.review.trim();

    if (this.isNameInvalid || this.isReviewInvalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return; // Stop form submission
    }

    const reviewCollection = collection(this.firestore, 'Clients Review');

    addDoc(reviewCollection, this.review)
      .then(() => {
        this.successMessage = ' Review added successfully!';
        this.errorMessage = ''; // Clear error message if any
        this.review = { name: '', review: '' }; // Reset form
        this.isNameInvalid = false;
        this.isReviewInvalid = false;

        // Remove success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      })
      .catch((error) => {
        this.errorMessage = ' Failed to add review. Please try again.';

        // Remove error message after 3 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
  }
}
