import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DocumentService } from '../../services/document.service';

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

  constructor(private documentService: DocumentService, private fb: FormBuilder) {
    this.verifyForm = this.fb.group({
      verificationCode: ['']
    });
  }

  verify() {
    const code = this.verifyForm.get('verificationCode')?.value;
    // Add your verification logic here
    this.verificationMessage = `Verification code ${code} submitted.`;
  }
}