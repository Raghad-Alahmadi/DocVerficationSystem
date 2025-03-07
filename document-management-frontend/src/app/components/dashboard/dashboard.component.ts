import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class DashboardComponent implements OnInit {
  documents: any[] = [];
  verificationMessage: string = '';
  verificationError: string = '';

  constructor(private documentService: DocumentService, private router: Router) {}

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe(data => {
      this.documents = data;
    });
  }

  navigateToVerification(verificationCode: string): void {
    this.router.navigate(['/verify'], { queryParams: { code: verificationCode } });
  }
}