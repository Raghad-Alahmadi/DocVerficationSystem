import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { VerificationComponent } from './components/verification/verification.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'upload', component: DocumentUploadComponent },
  { path: 'verify', component: VerificationComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

