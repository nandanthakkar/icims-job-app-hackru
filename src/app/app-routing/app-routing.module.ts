import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from '../jobs/jobs.component';
import { PeopleComponent } from '../people/people.component';
import { ApplicationsComponent } from '../applications/applications.component';

const routes: Routes = [
  { path: 'jobs', component: JobsComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'applications', component: ApplicationsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
