import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

export interface QuoteForm {
  category: 'web' | 'graphic' | 'video' | null;
  projectType: string;
  needsHosting: boolean;
  needsDomain: boolean;
  serviceTypes: string[];
  platform: string;
  numberOfPages: number | null;
  description: string;
  budget: string;
  deadline: string;
  references: string;
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
}

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
  standalone: false,
})
export class QuoteComponent implements OnDestroy {
  private router = inject(Router);
  private redirectTimer: ReturnType<typeof setInterval> | null = null;

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

  currentStep = 1;
  isSubmitting = false;
  showSuccessPage = false;
  redirectCountdown = 5;
  stepError = '';
  liveEmailError = '';
  livePhoneError = '';
  emailLooksValid = false;
  phoneLooksValid = false;
  private emailDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private phoneDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly liveValidationDelayMs = 400;

  quote: QuoteForm = this.emptyQuote();

  categories = [
    {
      value: 'web' as const,
      title: 'Web Development',
      description: 'Modern, responsive websites & web applications.',
      icon: 'icons/web-programming.png',
    },
    {
      value: 'graphic' as const,
      title: 'Graphic Design',
      description: 'Logos, branding & stunning visual assets.',
      icon: 'icons/curve.png',
    },
    {
      value: 'video' as const,
      title: 'Video Editing',
      description: 'Professional post-production & motion graphics.',
      icon: 'icons/video-camera.png',
    },
  ];

  webProjectTypes = [
    { value: 'crm', title: 'CRM', description: 'Customer relationship management systems.' },
    { value: 'ecommerce', title: 'E-Commerce', description: 'Online stores & payment integrations.' },
    { value: 'portfolio', title: 'Portfolio', description: 'Showcase your work professionally.' },
    { value: 'landing', title: 'Landing Page', description: 'High-converting single-page sites.' },
    { value: 'corporate', title: 'Corporate Website', description: 'Business presence & company info.' },
    { value: 'webapp', title: 'Web Application', description: 'Custom interactive web apps.' },
    { value: 'custom', title: 'Custom', description: 'Built with WordPress, Shopify & more.' },
  ];

  webServiceTypes = [
    { value: 'frontend', title: 'Frontend Development', description: 'UI/UX implementation & client-side logic.' },
    { value: 'backend', title: 'Backend Development', description: 'Server, database & business logic.' },
    { value: 'fullstack', title: 'Full Stack', description: 'End-to-end frontend & backend delivery.' },
    { value: 'api', title: 'API Development', description: 'REST/GraphQL APIs for apps & integrations.' },
    { value: 'bugfixes', title: 'Bug Fixes & Optimization', description: 'Fix issues & improve performance.' },
  ];

  platforms = [
    { value: 'wordpress', title: 'WordPress', description: 'Flexible CMS for blogs & business sites.' },
    { value: 'shopify', title: 'Shopify', description: 'E-commerce store setup & customization.' },
    { value: 'systemeio', title: 'Systeme.io', description: 'Funnels, email marketing & landing pages.' },
    { value: 'wix', title: 'Wix', description: 'Drag-and-drop website builder.' },
    { value: 'webflow', title: 'Webflow', description: 'Design-first no-code/low-code sites.' },
    { value: 'other', title: 'Other', description: 'Another platform or custom stack.' },
  ];

  graphicTypes = [
    { value: 'logo', title: 'Logo Design', description: 'Unique brand identity mark.' },
    { value: 'branding', title: 'Branding Kit', description: 'Full visual identity package.' },
    { value: 'social', title: 'Social Media Graphics', description: 'Posts, banners & ad creatives.' },
    { value: 'print', title: 'Print Design', description: 'Flyers, brochures & business cards.' },
    { value: 'ui', title: 'UI Design', description: 'App & website interface mockups.' },
  ];

  videoTypes = [
    { value: 'promo', title: 'Promotional Video', description: 'Product or service promos.' },
    { value: 'social', title: 'Social Media Reels', description: 'Short-form content for platforms.' },
    { value: 'corporate', title: 'Corporate Video', description: 'Company profiles & presentations.' },
    { value: 'youtube', title: 'YouTube Editing', description: 'Long-form content editing.' },
    { value: 'motion', title: 'Motion Graphics', description: 'Animated visuals & effects.' },
  ];

  budgetOptions = ['Under Rs 500', 'Rs 500 – Rs 1,000', 'Rs 1,000 – Rs 3,000', 'Rs 3,000 – Rs 5,000', 'Rs 5,000+', 'Not sure yet'];
  deadlineOptions = ['ASAP (1–2 days)','1–2 weeks', '1 Month', '2–3 Months', '3+ Months', 'Flexible'];
  contactMethods = ['Email', 'Phone', 'WhatsApp', 'Any'];

  get totalSteps(): number {
    if (this.quote.category === 'web') {
      return this.isCustomWebProject ? 6 : 5;
    }
    if (this.quote.category === 'graphic' || this.quote.category === 'video') {
      return 4;
    }
    return 1;
  }

  get isCustomWebProject(): boolean {
    return this.quote.projectType === 'custom';
  }

  get progressPercent(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  get stepTitle(): string {
    const titles: Record<string, string[]> = {
      web: this.isCustomWebProject
        ? ['Service Selection', 'Project Type', 'Service Scope', 'Platform', 'Project Details', 'Your Details']
        : ['Service Selection', 'Project Type', 'Service Scope', 'Project Details', 'Your Details'],
      graphic: ['Service Selection', 'Design Type', 'Project Details', 'Your Details'],
      video: ['Service Selection', 'Video Type', 'Project Details', 'Your Details'],
    };
    const list = this.quote.category ? titles[this.quote.category] : ['Service Selection'];
    return list[this.currentStep - 1] ?? 'Quote';
  }

  get isLastStep(): boolean {
    return this.currentStep === this.totalSteps;
  }

  private emptyQuote(): QuoteForm {
    return {
      category: null,
      projectType: '',
      needsHosting: false,
      needsDomain: false,
      serviceTypes: [],
      platform: '',
      numberOfPages: null,
      description: '',
      budget: '',
      deadline: '',
      references: '',
      name: '',
      email: '',
      phone: '',
      contactMethod: 'Email',
    };
  }

  selectCategory(category: 'web' | 'graphic' | 'video') {
    if (this.quote.category !== category) {
      const saved = { name: this.quote.name, email: this.quote.email, phone: this.quote.phone, contactMethod: this.quote.contactMethod };
      this.quote = { ...this.emptyQuote(), ...saved, category };
    }
    this.stepError = '';
  }

  selectProjectType(type: string) {
    this.quote.projectType = type;
    if (type !== 'custom') {
      this.quote.platform = '';
    }
    this.stepError = '';
  }

  selectPlatform(platform: string) {
    this.quote.platform = platform;
    this.stepError = '';
  }

  toggleServiceType(value: string) {
    const idx = this.quote.serviceTypes.indexOf(value);
    if (idx > -1) {
      this.quote.serviceTypes = this.quote.serviceTypes.filter((s) => s !== value);
    } else {
      this.quote.serviceTypes = [...this.quote.serviceTypes, value];
    }
    this.stepError = '';
  }

  isServiceTypeSelected(value: string): boolean {
    return this.quote.serviceTypes.includes(value);
  }

  canContinue(): boolean {
    this.stepError = '';
    if (this.currentStep === 1) {
      return !!this.quote.category;
    }

    if (this.quote.category === 'web') {
      if (this.currentStep === 2) return !!this.quote.projectType;
      if (this.currentStep === 3) return this.quote.serviceTypes.length > 0;
      if (this.isCustomWebProject && this.currentStep === 4) return !!this.quote.platform;
      const detailsStep = this.isCustomWebProject ? 5 : 4;
      if (this.currentStep === detailsStep) {
        return (
          this.quote.numberOfPages !== null &&
          this.quote.numberOfPages > 0 &&
          !!this.quote.description.trim() &&
          !!this.quote.budget &&
          !!this.quote.deadline
        );
      }
      if (this.isLastStep) return this.isUserDetailsValid();
    }

    if (this.quote.category === 'graphic' || this.quote.category === 'video') {
      if (this.currentStep === 2) return !!this.quote.projectType;
      if (this.currentStep === 3) {
        return !!this.quote.description.trim() && !!this.quote.budget && !!this.quote.deadline;
      }
      if (this.isLastStep) return this.isUserDetailsValid();
    }

    return false;
  }

  private readonly blockedEmailDomains = new Set([
    'yopmail.com',
    'example.com',
    'test.com',
  ]);

  private readonly allowedProviderDomains = new Set([
    'gmail.com',
    'googlemail.com',
    'hotmail.com',
    'hotmail.co.uk',
    'outlook.com',
    'outlook.co.uk',
    'live.com',
    'live.co.uk',
  ]);

  private isEmailValid(email: string): boolean {
    return this.getEmailValidationMessage(email) === null;
  }

  private getEmailValidationMessage(email: string): string | null {
    const trimmed = email.trim();
    if (!trimmed) return 'Please enter your email.';

    const normalized = trimmed.toLowerCase();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (!emailPattern.test(normalized)) {
      return 'Please enter a valid email address.';
    }

    const domain = normalized.split('@')[1];
    if (this.blockedEmailDomains.has(domain)) {
      return 'Disposable or test email domains are not allowed.';
    }

    if (this.allowedProviderDomains.has(domain)) return null;

    const domainPattern = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;
    const tld = domain.split('.').pop() ?? '';
    if (!domainPattern.test(domain) || tld.length < 2) {
      return 'Please use Gmail, Hotmail, or a valid custom domain email.';
    }

    return null;
  }

  private isPhoneValid(phone: string): boolean {
    return this.getPhoneValidationMessage(phone) === null;
  }

  private getPhoneValidationMessage(phone: string): string | null {
    const trimmed = phone.trim();
    if (!trimmed) return 'Please enter your phone number.';

    if (!/^\+?[\d\s\-().]+$/.test(trimmed)) {
      return 'Phone number can only contain digits, spaces, +, -, ( ).';
    }

    const digits = trimmed.replace(/\D/g, '');
    if (digits.length < 10) {
      return 'Phone number must have at least 10 digits.';
    }
    if (digits.length > 15) {
      return 'Phone number must not exceed 15 digits.';
    }

    return null;
  }

  private isUserDetailsValid(): boolean {
    return (
      !!this.quote.name.trim() &&
      this.isEmailValid(this.quote.email) &&
      this.isPhoneValid(this.quote.phone) &&
      !!this.quote.contactMethod
    );
  }

  onEmailInput() {
    this.emailLooksValid = false;
    this.liveEmailError = '';
    if (this.emailDebounceTimer) clearTimeout(this.emailDebounceTimer);
    this.emailDebounceTimer = setTimeout(() => {
      this.validateEmailLive();
      this.emailDebounceTimer = null;
    }, this.liveValidationDelayMs);
  }

  onPhoneInput() {
    this.phoneLooksValid = false;
    this.livePhoneError = '';
    if (this.phoneDebounceTimer) clearTimeout(this.phoneDebounceTimer);
    this.phoneDebounceTimer = setTimeout(() => {
      this.validatePhoneLive();
      this.phoneDebounceTimer = null;
    }, this.liveValidationDelayMs);
  }

  private validateEmailLive(force = false) {
    const trimmed = this.quote.email.trim();
    if (!trimmed) {
      this.liveEmailError = force ? 'Please enter your email.' : '';
      this.emailLooksValid = false;
      return;
    }

    const error = this.getEmailValidationMessage(this.quote.email);
    this.liveEmailError = error ?? '';
    this.emailLooksValid = error === null;
  }

  private validatePhoneLive(force = false) {
    const trimmed = this.quote.phone.trim();
    if (!trimmed) {
      this.livePhoneError = force ? 'Please enter your phone number.' : '';
      this.phoneLooksValid = false;
      return;
    }

    const error = this.getPhoneValidationMessage(this.quote.phone);
    this.livePhoneError = error ?? '';
    this.phoneLooksValid = error === null;
  }

  private clearLiveFieldValidation() {
    this.liveEmailError = '';
    this.livePhoneError = '';
    this.emailLooksValid = false;
    this.phoneLooksValid = false;
    this.clearLiveValidationTimers();
  }

  private clearLiveValidationTimers() {
    if (this.emailDebounceTimer) {
      clearTimeout(this.emailDebounceTimer);
      this.emailDebounceTimer = null;
    }
    if (this.phoneDebounceTimer) {
      clearTimeout(this.phoneDebounceTimer);
      this.phoneDebounceTimer = null;
    }
  }

  nextStep() {
    if (!this.canContinue()) {
      if (this.isLastStep) {
        this.validateEmailLive(true);
        this.validatePhoneLive(true);
      }
      this.stepError = this.getValidationMessage();
      return;
    }
    if (this.isLastStep) {
      this.submitQuote();
      return;
    }
    this.currentStep++;
    this.stepError = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.stepError = '';
      if (!this.isLastStep) {
        this.clearLiveFieldValidation();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private getValidationMessage(): string {
    if (this.currentStep === 1) return 'Please select a service category.';
    if (this.quote.category === 'web') {
      if (this.currentStep === 2) return 'Please select a project type.';
      if (this.currentStep === 3) return 'Please select at least one service type.';
      if (this.isCustomWebProject && this.currentStep === 4) return 'Please select a platform.';
      const detailsStep = this.isCustomWebProject ? 5 : 4;
      if (this.currentStep === detailsStep) {
        if (!this.quote.numberOfPages || this.quote.numberOfPages < 1) return 'Please enter the number of pages.';
        if (!this.quote.description.trim()) return 'Please describe your project.';
        if (!this.quote.budget) return 'Please select a budget range.';
        if (!this.quote.deadline) return 'Please select a timeline.';
      }
    }
    if (this.quote.category === 'graphic' || this.quote.category === 'video') {
      if (this.currentStep === 2) return 'Please select a project type.';
      if (this.currentStep === 3) {
        if (!this.quote.description.trim()) return 'Please describe your project.';
        if (!this.quote.budget) return 'Please select a budget range.';
        if (!this.quote.deadline) return 'Please select a timeline.';
      }
    }
    if (this.isLastStep) {
      if (!this.quote.name.trim()) return 'Please enter your name.';
      const emailError = this.getEmailValidationMessage(this.quote.email);
      if (emailError) return emailError;
      const phoneError = this.getPhoneValidationMessage(this.quote.phone);
      if (phoneError) return phoneError;
    }
    return 'Please complete all required fields.';
  }

  submitQuote() {
    if (!this.canContinue() || this.isSubmitting) return;

    this.isSubmitting = true;
    this.stepError = '';
    this.showLoading('Sending Quote Request', 'Please wait while we send your quote request...');

    emailjs
      .send(
        'service_b124c9s',
        'template_2lkppdx',
        {
          user_name: this.quote.name,
          user_email: this.quote.email,
          message: this.buildEmailMessage(),
        },
        { publicKey: '3-fQaflqnq8rizVh-' }
      )
      .then(
        () => {
          Swal.close();
          this.showSuccessPage = true;
          this.startRedirectCountdown();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        (error) => {
          Swal.close();
          this.showWarn(
            'Failed to submit Quote',
            (error as EmailJSResponseStatus).text
          );
          this.stepError =
            'Failed to submit your quote. Please try again or contact me directly.';
        }
      )
      .finally(() => {
        this.isSubmitting = false;
      });
  }

  private buildEmailMessage(): string {
    const q = this.quote;
    const lines: string[] = ['--- Quote Request ---', ''];

    lines.push(`Service Category: ${q.category ?? 'N/A'}`);

    if (q.projectType) {
      lines.push(`Project Type: ${this.getProjectTypeLabel(q.projectType)}`);
    }

    if (q.category === 'web') {
      if (q.serviceTypes.length) {
        lines.push(`Services: ${this.getServiceTypesSummary()}`);
      }
      if (q.platform) {
        lines.push(`Platform: ${this.getPlatformLabel(q.platform)}`);
      }
      if (q.numberOfPages) {
        lines.push(`Number of Pages: ${q.numberOfPages}`);
      }
      const extras: string[] = [];
      if (q.needsHosting) extras.push('Hosting');
      if (q.needsDomain) extras.push('Domain');
      if (extras.length) {
        lines.push(`Extras: ${extras.join(', ')}`);
      }
    }

    if (q.budget) lines.push(`Budget: ${q.budget}`);
    if (q.deadline) lines.push(`Timeline: ${q.deadline}`);
    if (q.references) lines.push(`References: ${q.references}`);

    if (q.description) {
      lines.push('');
      lines.push('Project Description:');
      lines.push(q.description);
    }

    lines.push('');
    lines.push(`Phone: ${q.phone}`);
    lines.push(`Preferred Contact: ${q.contactMethod}`);

    return lines.join('\n');
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

  showWarn(modelTitle: string, message?: string) {
    this.toastMixin.fire({
      title: modelTitle,
      text: message,
      icon: 'error',
    });
  }

  private startRedirectCountdown() {
    this.redirectCountdown = 5;
    this.redirectTimer = setInterval(() => {
      this.redirectCountdown--;
      if (this.redirectCountdown <= 0) {
        this.goHome();
      }
    }, 1000);
  }

  goHome() {
    this.clearRedirectTimer();
    this.clearLiveFieldValidation();
    this.quote = this.emptyQuote();
    this.currentStep = 1;
    this.showSuccessPage = false;
    this.router.navigate(['/home']);
  }

  private clearRedirectTimer() {
    if (this.redirectTimer) {
      clearInterval(this.redirectTimer);
      this.redirectTimer = null;
    }
  }

  ngOnDestroy() {
    this.clearRedirectTimer();
    this.clearLiveValidationTimers();
  }

  getProjectTypeLabel(value: string): string {
    const all = [...this.webProjectTypes, ...this.graphicTypes, ...this.videoTypes];
    return all.find((t) => t.value === value)?.title ?? value;
  }

  getServiceTypeLabel(value: string): string {
    return this.webServiceTypes.find((s) => s.value === value)?.title ?? value;
  }

  getPlatformLabel(value: string): string {
    return this.platforms.find((p) => p.value === value)?.title ?? value;
  }

  getServiceTypesSummary(): string {
    return this.quote.serviceTypes.map((s) => this.getServiceTypeLabel(s)).join(', ');
  }
}
