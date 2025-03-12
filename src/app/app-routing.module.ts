import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientReviewComponent } from './add-client-review/add-client-review.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { AddProjectsComponent } from './add-projects/add-projects.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent }, // ✅ Change 'HOME' to 'home'
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'add/client/review', component: AddClientReviewComponent },
  { path: 'add/projects', component: AddProjectsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // ✅ Update redirectTo value
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
