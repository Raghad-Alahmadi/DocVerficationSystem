import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class VerificationComponent {
  verifyForm: FormGroup;
  verificationMessage: string = '';

  constructor(private fb: FormBuilder, private documentService: DocumentService) {
    this.verifyForm = this.fb.group({
      verificationCode: ['', Validators.required]
    });
  }

  verify() {
    if (this.verifyForm.valid) {
      this.documentService.verifyDocument(this.verifyForm.value).subscribe(response => {
        this.verificationMessage = response.message;
      });
    }
  }
}