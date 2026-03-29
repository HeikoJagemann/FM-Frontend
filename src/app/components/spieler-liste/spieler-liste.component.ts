import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpielerService } from '../../services/spieler.service';
import { Spieler } from '../../models/spieler.model';

@Component({
  selector: 'app-spieler-liste',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './spieler-liste.component.html',
  styleUrl: './spieler-liste.component.scss'
})
export class SpielerListeComponent implements OnInit {
  spieler: Spieler[] = [];
  loading = false;
  vereinId!: number;
  displayedColumns = ['name', 'alter', 'position', 'kader', 'staerke', 'wert', 'aktionen'];

  constructor(
    private spielerService: SpielerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.vereinId = Number(this.route.snapshot.paramMap.get('vereinId'));
    this.laden();
  }

  laden(): void {
    this.loading = true;
    this.spielerService.getAll().subscribe({
      next: (data) => {
        this.spieler = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Fehler beim Laden der Spieler', 'OK', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  generieren(): void {
    this.spielerService.generate().subscribe({
      next: () => {
        this.snackBar.open('Spieler generiert!', 'OK', { duration: 2000 });
        this.laden();
      },
      error: () => {
        this.snackBar.open('Fehler beim Generieren', 'OK', { duration: 3000 });
      }
    });
  }

  detail(spieler: Spieler): void {
    this.router.navigate(['spieler', spieler.id], { relativeTo: this.route });
  }

  zurueck(): void {
    this.router.navigate(['/']);
  }

  loeschen(spieler: Spieler, event: Event): void {
    event.stopPropagation();
    this.spielerService.delete(spieler.id).subscribe({
      next: () => {
        this.snackBar.open(`${spieler.name} gelöscht`, 'OK', { duration: 2000 });
        this.laden();
      },
      error: () => {
        this.snackBar.open('Fehler beim Löschen', 'OK', { duration: 3000 });
      }
    });
  }

  wertFormatiert(wert: number): string {
    if (wert >= 1_000_000) return `${(wert / 1_000_000).toFixed(1)}M €`;
    if (wert >= 1_000) return `${(wert / 1_000).toFixed(0)}K €`;
    return `${wert} €`;
  }
}
