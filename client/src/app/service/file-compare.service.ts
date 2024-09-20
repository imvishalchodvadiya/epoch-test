import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileCompareService {

  constructor(private http: HttpClient) {}

  compareFiles(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:3000/compare', formData);
  }
}
