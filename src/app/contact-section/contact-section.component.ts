import { Component } from '@angular/core';

import Swal from 'sweetalert2';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-section',
  standalone: false,

  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css',
})
export class ContactSectionComponent {
  contactEmail: string = 'ali.usama578@gmail.com';
  constructor(private router: Router) {}

  toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    timerProgressBar: true,
    animation: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  public sendEmail(e: Event) {
    e.preventDefault();
    this.showLoading('Sending Email', 'Please wait sending email...');
    emailjs
      .sendForm(
        'service_pxvaeod',
        'template_3xqegji',
        e.target as HTMLFormElement,
        {
          publicKey: 'wDAiBvee_YZf7-n7QbfuX',
        }
      )
      .then(
        () => {
          this.router.navigate(['/home']).then(() => {
            this.showSuccess(`Message Sended Successfully`);
            window.location.reload();
          });
        },
        (error) => {
          this.showWarn(
            'Failed to send Message',
            (error as EmailJSResponseStatus).text
          );
        }
      );
  }
  showLoading(modelTitle: string, modelText: string) {
    Swal.fire({
      title: modelTitle,
      text: modelText,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  showSuccess(modelTitle: string) {
    this.toastMixin.fire({
      title: modelTitle,
      icon: 'success',
    });
  }

  showWarn(modelTitle: string, message?: any) {
    this.toastMixin.fire({
      title: modelTitle,
      text: message,
      icon: 'error',
    });
  }
}
