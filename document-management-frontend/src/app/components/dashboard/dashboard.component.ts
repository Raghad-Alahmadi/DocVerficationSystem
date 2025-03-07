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

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe(data => {
      this.documents = data;
    });
  }

  verify(documentId: number): void {
    this.documentService.verifyDocument(documentId.toString()).subscribe(response => {
      console.log(`Document verified successfully: ${response.title}`);
      // Update the document status in the documents array
      const document = this.documents.find(doc => doc.id === documentId);
      if (document) {
        document.status = 'Verified';
      }
    }, error => {
      console.log('Verification failed');
    });
  }
}