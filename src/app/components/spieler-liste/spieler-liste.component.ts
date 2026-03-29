import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpielerService } from '../../services/spieler.service';
import { KaderTabelleComponent } from '../kader-tabelle/kader-tabelle.component';
import { Spieler } from '../../models/spieler.model';

@Component({
  selector: 'app-spieler-liste',
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    KaderTabelleComponent,
  ],
  templateUrl: './spieler-liste.component.html',
  styleUrl: './spieler-liste.component.scss'
})
export class SpielerListeComponent implements OnInit {
  alle:    Spieler[] = [];
  loading  = false;
  vereinId!: number;

  get profi()   { return this.alle.filter(s => s.kader === 'Profi'); }
  get amateur() { return this.alle.filter(s => s.kader === 'Amateur'); }

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
      next: (data) => { this.alle = data; this.loading = false; },
      error: () => {
        this.snackBar.open('Fehler beim Laden', 'OK', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  generieren(): void {
    this.spielerService.generate().subscribe({
      next: () => { this.snackBar.open('Spieler generiert!', 'OK', { duration: 2000 }); this.laden(); },
      error: () => { this.snackBar.open('Fehler beim Generieren', 'OK', { duration: 3000 }); }
    });
  }

  detail(s: Spieler): void {
    this.router.navigate(['spieler', s.id], { relativeTo: this.route });
  }

  loeschen(s: Spieler): void {
    this.spielerService.delete(s.id).subscribe({
      next: () => { this.snackBar.open(`${s.name} gelöscht`, 'OK', { duration: 2000 }); this.laden(); },
      error: () => { this.snackBar.open('Fehler beim Löschen', 'OK', { duration: 3000 }); }
    });
  }
}
