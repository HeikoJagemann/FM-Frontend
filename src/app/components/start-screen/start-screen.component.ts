import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, switchMap, takeUntil, Subject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { VereinService } from '../../services/verein.service';
import { Verein } from '../../models/verein.model';

type Zustand = 'start' | 'laden' | 'auswahl';

interface Fortschritt {
  nachricht: string;
  prozent: number;
  fertig: boolean;
}

@Component({
  selector: 'app-start-screen',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent implements OnDestroy {
  zustand: Zustand = 'start';
  fortschritt = 0;
  fortschrittNachricht = '';
  angebote: Verein[] = [];

  private readonly destroyed$ = new Subject<void>();
  private pollingSub?: Subscription;

  private readonly apiBase = 'http://localhost:8081/api/spiel';

  constructor(
    private http: HttpClient,
    private vereinService: VereinService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  neuesSpielStarten(): void {
    this.zustand = 'laden';
    this.fortschritt = 0;
    this.fortschrittNachricht = 'Starte...';

    this.http.post(`${this.apiBase}/initialisieren`, {}).subscribe({
      next: () => this.startePolling(),
      error: () => {
        this.zustand = 'start';
        this.snackBar.open('Backend nicht erreichbar', 'OK', { duration: 4000 });
      }
    });
  }

  private startePolling(): void {
    this.pollingSub = interval(600).pipe(
      switchMap(() => this.http.get<Fortschritt>(`${this.apiBase}/fortschritt`)),
      takeUntil(this.destroyed$)
    ).subscribe({
      next: (dto) => {
        this.fortschritt = dto.prozent;
        this.fortschrittNachricht = dto.nachricht;
        if (dto.fertig) {
          this.stoppePolling();
          this.ladeAngebote();
        }
      },
      error: () => {
        this.stoppePolling();
        this.zustand = 'start';
        this.snackBar.open('Fehler beim Laden des Fortschritts', 'OK', { duration: 4000 });
      }
    });
  }

  private stoppePolling(): void {
    this.pollingSub?.unsubscribe();
  }

  private ladeAngebote(): void {
    this.vereinService.getOberligaAngebote().subscribe({
      next: (v) => {
        this.angebote = v;
        this.zustand = 'auswahl';
      },
      error: () => {
        this.zustand = 'start';
        this.snackBar.open('Fehler beim Laden der Vereinsangebote', 'OK', { duration: 4000 });
      }
    });
  }

  andereVereine(): void {
    this.ladeAngebote();
  }

  vereinWaehlen(verein: Verein): void {
    this.router.navigate(['/spiel', verein.id]);
  }

  staerkeSterne(staerke: number): number[] {
    return Array(Math.min(5, Math.max(1, Math.round(staerke / 20)))).fill(0);
  }

  staerkeLabel(staerke: number): string {
    if (staerke >= 28) return 'Stark';
    if (staerke >= 24) return 'Mittel';
    return 'Aufbauend';
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
