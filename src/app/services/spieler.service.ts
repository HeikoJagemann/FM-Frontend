import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spieler } from '../models/spieler.model';

@Injectable({
  providedIn: 'root'
})
export class SpielerService {
  private apiUrl = 'http://localhost:8081/api/spieler';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Spieler[]> {
    return this.http.get<Spieler[]>(this.apiUrl);
  }

  getById(id: number): Observable<Spieler> {
    return this.http.get<Spieler>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  generate(): Observable<Spieler> {
    return this.http.post<Spieler>(`${this.apiUrl}/generate`, {});
  }
}
