import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DocumentService]
})
export class VerificationComponent {
  verifyForm: FormGroup;
  verificationMessage: string = '';

  constructor(private fb: FormBuilder, private documentService: DocumentService) {
    this.verifyForm = this.fb.group({
      verificationCode: ['']
    });
  }

  verify(): void {
    const code = this.verifyForm.get('verificationCode')?.value;
    this.documentService.verifyDocument(code).subscribe(response => {
      this.verificationMessage = `Document verified successfully: ${response.title}`;
    }, error => {
      this.verificationMessage = 'Verification failed';
    });
  }
}