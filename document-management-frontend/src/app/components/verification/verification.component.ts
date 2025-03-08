import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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
export class VerificationComponent implements OnInit {
  verifyForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private documentService: DocumentService, private route: ActivatedRoute) {
    this.verifyForm = this.fb.group({
      verificationCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const verificationCode = params['code'];
      if (verificationCode) {
        this.verifyForm.patchValue({ verificationCode });
      }
    });
  }

  verify(): void {
    if (this.verifyForm.valid) {
      const verificationCode = this.verifyForm.get('verificationCode')?.value;
      const verifiedBy = 'Admin'; 
      this.documentService.verifyDocument(verificationCode, verifiedBy).subscribe(response => {
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