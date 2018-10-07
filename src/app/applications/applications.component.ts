import { Component, OnInit } from '@angular/core';
import { Application } from '../application';
import { ApplicationsService } from '../applications.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications: Application[];
  constructor(private applicationsService: ApplicationsService) { }

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this.applicationsService.getApplications().subscribe(applications => this.applications = applications);
  }

}
