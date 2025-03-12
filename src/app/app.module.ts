import { importProvidersFrom, NgModule, PLATFORM_ID } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddClientReviewComponent } from './add-client-review/add-client-review.component';
import { ButtonComponent } from './button/button.component';
import { ClientsComponent } from './clients/clients.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectsSectionComponent } from './projects-section/projects-section.component';
import { SkillSectionComponent } from './skill-section/skill-section.component';
import { SocialContactComponent } from './social-contact/social-contact.component';
import { helperFunctions } from './helpers/helperFunctions';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';
import {
  provideFirestore,
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
} from '@angular/fire/firestore';
import {
  provideStorage,
  getStorage,
  connectStorageEmulator,
} from '@angular/fire/storage';
import { inject } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { isPlatformBrowser } from '@angular/common';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroSectionComponent,
    SkillSectionComponent,
    FooterComponent,
    ProjectsSectionComponent,
    ContactSectionComponent,
    ButtonComponent,
    SocialContactComponent,
    ProjectsPageComponent,
    HomePageComponent,
    ClientsComponent,
    AddClientReviewComponent,
    AddProjectsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    helperFunctions,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      // const platformId = inject(PLATFORM_ID);
      // if (!isPlatformBrowser(platformId)) {
      //   return {} as Firestore; // Prevent SSR crash by returning an empty object
      // }

      const firestore = getFirestore(); // Get Firestore instance only in browser
      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, environment.localhostIp, 8080);
      }
      return firestore;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (environment.useEmulators) {
        connectStorageEmulator(storage, environment.localhostIp, 9199);
      }
      return storage;
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
