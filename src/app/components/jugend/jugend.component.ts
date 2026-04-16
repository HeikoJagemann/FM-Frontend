import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SpielerService } from '../../services/spieler.service';
import { KaderTabelleComponent } from '../kader-tabelle/kader-tabelle.component';
import { Spieler } from '../../models/spieler.model';

@Component({
  selector: 'app-jugend',
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    KaderTabelleComponent,
  ],
  templateUrl: './jugend.component.html',
  styleUrl: './jugend.component.scss'
})
export class JugendComponent implements OnInit {
  alle:    Spieler[] = [];
  loading  = false;
  vereinId!: number;

  get jugendA() { return this.alle.filter(s => s.kader === 'JugendA'); }
  get jugendB() { return this.alle.filter(s => s.kader === 'JugendB'); }
  get jugendC() { return this.alle.filter(s => s.kader === 'JugendC'); }

  constructor(
    private spielerService: SpielerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.vereinId = Number(this.route.snapshot.parent?.paramMap.get('vereinId'));
    this.laden();
  }

  laden(): void {
    this.loading = true;
    this.spielerService.getByVerein(this.vereinId).subscribe({
      next: (data) => { this.alle = data; this.loading = false; },
      error: () => {
        this.snackBar.open('Fehler beim Laden', 'OK', { duration: 3000 });
        this.loading = false;
      }
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
