import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { VereinService } from '../../services/verein.service';
import { Verein } from '../../models/verein.model';

@Component({
  selector: 'app-start-screen',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent implements OnInit {
  vereinName = '';
  vorhandeneSpiele: Verein[] = [];
  loading = false;
  neuesSpielOffen = false;

  constructor(
    private vereinService: VereinService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.laden();
  }

  laden(): void {
    this.loading = true;
    this.vereinService.getAll().subscribe({
      next: (v) => {
        this.vorhandeneSpiele = v;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  neuesSpielStarten(): void {
    if (!this.vereinName.trim()) return;
    this.vereinService.create(this.vereinName.trim()).subscribe({
      next: (v) => {
        this.router.navigate(['/spiel', v.id]);
      },
      error: () => {
        this.snackBar.open('Fehler beim Erstellen des Spiels', 'OK', { duration: 3000 });
      }
    });
  }

  spielLaden(verein: Verein): void {
    this.router.navigate(['/spiel', verein.id]);
  }

  spielLoeschen(verein: Verein, event: Event): void {
    event.stopPropagation();
    this.vereinService.delete(verein.id).subscribe({
      next: () => {
        this.snackBar.open(`"${verein.name}" gelöscht`, 'OK', { duration: 2000 });
        this.laden();
      },
      error: () => {
        this.snackBar.open('Fehler beim Löschen', 'OK', { duration: 3000 });
      }
    });
  }
}
