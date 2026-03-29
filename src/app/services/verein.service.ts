import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Verein } from '../models/verein.model';

@Injectable({
  providedIn: 'root'
})
export class VereinService {
  private apiUrl = 'http://localhost:8080/api/verein';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Verein[]> {
    return this.http.get<Verein[]>(this.apiUrl);
  }

  create(name: string): Observable<Verein> {
    return this.http.post<Verein>(this.apiUrl, { name });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
