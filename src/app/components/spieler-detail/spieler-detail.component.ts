import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpielerService } from '../../services/spieler.service';
import { Spieler } from '../../models/spieler.model';

@Component({
  selector: 'app-spieler-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './spieler-detail.component.html',
  styleUrl: './spieler-detail.component.scss'
})
export class SpielerDetailComponent implements OnInit {
  spieler: Spieler | null = null;
  loading = true;
  vereinId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spielerService: SpielerService
  ) {}

  ngOnInit(): void {
    const vereinId = Number(this.route.snapshot.paramMap.get('vereinId'));
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vereinId = vereinId;
    this.spielerService.getById(id).subscribe({
      next: (s) => {
        this.spieler = s;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  zurueck(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  wertFormatiert(wert: number): string {
    if (wert >= 1_000_000) return `${(wert / 1_000_000).toFixed(1)}M €`;
    if (wert >= 1_000) return `${(wert / 1_000).toFixed(0)}K €`;
    return `${wert} €`;
  }

  isTorwart(): boolean {
    return this.spieler?.position === 'TW';
  }
}
