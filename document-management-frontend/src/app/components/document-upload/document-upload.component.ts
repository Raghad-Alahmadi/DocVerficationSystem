import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class DocumentUploadComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  verificationCode: string = ''; 
  constructor(private fb: FormBuilder, private documentService: DocumentService) {
    this.uploadForm = this.fb.group({
      userId: [1, Validators.required],
      title: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadForm.patchValue({ file: this.selectedFile });
    }
  }

  upload(): void {
    if (this.uploadForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('userId', this.uploadForm.get('userId')?.value);
      formData.append('title', this.uploadForm.get('title')?.value);
      formData.append('file', this.selectedFile);

      this.documentService.uploadDocument(formData).subscribe((response: any) => {
        this.successMessage = 'Document uploaded successfully';
        this.errorMessage = '';
        this.verificationCode = response.verificationCode; // Store the verification code
        this.uploadForm.reset();
        this.selectedFile = null;
        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
      }, error => {
        this.errorMessage = 'Error uploading document';
        this.successMessage = '';
      });
    } else {
      this.uploadForm.markAllAsTouched();
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.uploadForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}