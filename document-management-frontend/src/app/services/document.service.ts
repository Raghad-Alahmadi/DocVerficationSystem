import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'https://verficationsystem.azurewebsites.net/api/document';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getDocument(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  verifyDocument(verificationCode: string, verifiedBy: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify`, { verificationCode, verifiedBy });
  }
}
