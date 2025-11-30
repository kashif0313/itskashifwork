import { Component } from '@angular/core';

import Swal from 'sweetalert2';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { Router } from '@angular/router';
import {
  faFacebook,
  faGithub,
  faLinkedinIn,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-section',
  standalone: false,

  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css',
})
export class ContactSectionComponent {
  faGithub = faGithub;
  faLinkedin = faLinkedinIn;
  faFacebook = faFacebook;
  faEmail = faEnvelope;

  contactEmail: string = 'kashif.imran0313@gmail.com';
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
    const form = e.target as HTMLFormElement;
    const nameInput = form.querySelector<HTMLInputElement>(
      'input[name="user_name"]'
    );
    const emailInput = form.querySelector<HTMLInputElement>(
      'input[name="user_email"]'
    );
    const messageInput = form.querySelector<HTMLTextAreaElement>(
      'textarea[name="message"]'
    );

    const nameError = form.querySelector<HTMLSpanElement>('.name-error');
    const emailError = form.querySelector<HTMLSpanElement>('.email-error');
    const messageError = form.querySelector<HTMLSpanElement>('.message-error');

    if (
      !nameInput ||
      !emailInput ||
      !messageInput ||
      !nameError ||
      !emailError ||
      !messageError
    )
      return;

    let hasError = false;

    // ⭐ Name validation
    if (nameInput.value.trim() === '') {
      nameError.classList.remove('hidden');
      hasError = true;
    } else {
      nameError.classList.add('hidden');
    }

    // ⭐ Email validation (required + pattern)
    if (!emailInput.checkValidity()) {
      emailError.classList.remove('hidden');
      hasError = true;
    } else {
      emailError.classList.add('hidden');
    }

    // ⭐ Message validation
    if (messageInput.value.trim() === '') {
      messageError.classList.remove('hidden');
      hasError = true;
    } else {
      messageError.classList.add('hidden');
    }

    if (hasError) return;
    this.showLoading('Sending Email', 'Please wait sending email...');
    emailjs
      .sendForm(
        'service_b124c9s',
        'template_2lkppdx',
        e.target as HTMLFormElement,
        {
          publicKey: '3-fQaflqnq8rizVh-',
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
