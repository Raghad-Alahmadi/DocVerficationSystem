import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  ]
})
export class VerificationComponent {
  verifyForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private documentService: DocumentService) {
    this.verifyForm = this.fb.group({
      documentId: ['', Validators.required]
    });
  }

  verify(): void {
    if (this.verifyForm.valid) {
      const documentId = this.verifyForm.get('documentId')?.value;
      this.documentService.verifyDocument(documentId).subscribe(response => {
        this.successMessage = `Document verified successfully: ${response.title}`;
        this.errorMessage = '';
        this.verifyForm.reset();
      }, error => {
        this.errorMessage = 'Verification failed';
        this.successMessage = '';
      });
    } else {
      this.verifyForm.markAllAsTouched();
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.verifyForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}