import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  verifyForm: FormGroup;
  verificationResult: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.verifyForm = this.fb.group({
      verificationCode: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.verifyForm.valid) {
      this.http.post('/api/verify', this.verifyForm.value).subscribe(response => {
        this.verificationResult = response;
      });
    }
  }
}