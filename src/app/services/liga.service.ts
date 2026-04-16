import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Liga } from '../models/liga.model';
import { Spiel } from '../models/spiel.model';
import { Tabelleneintrag } from '../models/tabelleneintrag.model';

@Injectable({
  providedIn: 'root'
})
export class LigaService {
  private apiUrl = 'http://localhost:8081/api/liga';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Liga[]> {
    return this.http.get<Liga[]>(this.apiUrl);
  }

  getById(id: number): Observable<Liga> {
    return this.http.get<Liga>(`${this.apiUrl}/${id}`);
  }

  getTabelle(ligaId: number): Observable<Tabelleneintrag[]> {
    return this.http.get<Tabelleneintrag[]>(`${this.apiUrl}/${ligaId}/tabelle`);
  }

  getSpielplan(ligaId: number): Observable<Spiel[]> {
    return this.http.get<Spiel[]>(`${this.apiUrl}/${ligaId}/spielplan`);
  }

  getErgebnisse(ligaId: number): Observable<Spiel[]> {
    return this.http.get<Spiel[]>(`${this.apiUrl}/${ligaId}/ergebnisse`);
  }
}
