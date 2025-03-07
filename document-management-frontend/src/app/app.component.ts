import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { VerificationComponent } from './components/verification/verification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardComponent,
    DocumentUploadComponent,
    VerificationComponent
  ]
})
export class AppComponent {
  currentComponent: string = 'dashboard';

  showComponent(component: string) {
    this.currentComponent = component;
  }
}