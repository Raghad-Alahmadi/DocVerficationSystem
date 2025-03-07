import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe(data => {
      this.documents = data;
    });
  }

  verify(documentId: number): void {
    this.documentService.verifyDocument(documentId).subscribe(response => {
      this.verificationMessage = `Document verified successfully: ${response.title}`;
      this.verificationError = '';
      // Update the document status in the documents array
      const document = this.documents.find(doc => doc.id === documentId);
      if (document) {
        document.status = 'Verified';
      }
    }, error => {
      this.verificationError = 'Verification failed';
      this.verificationMessage = '';
    });
  }
}