import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LigaService } from '../../services/liga.service';
import { VereinService } from '../../services/verein.service';
import { Tabelleneintrag } from '../../models/tabelleneintrag.model';

@Component({
  selector: 'app-statistiken',
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './statistiken.component.html',
  styleUrl: './statistiken.component.scss'
})
export class StatistikenComponent implements OnInit {
  loading = true;
  ligaName = '';

  treffsichersteVereine: Tabelleneintrag[] = [];
  besteAbwehren: Tabelleneintrag[] = [];
  meisteSiege: Tabelleneintrag[] = [];
  gesamtTore = 0;
  gesamtSpiele = 0;

  constructor(
    private route: ActivatedRoute,
    private ligaService: LigaService,
    private vereinService: VereinService
  ) {}

  ngOnInit(): void {
    const vereinId = Number(this.route.snapshot.parent?.parent?.paramMap.get('vereinId'));
    this.vereinService.getById(vereinId).subscribe({
      next: (v) => {
        this.ligaName = v.liga.name;
        this.ligaService.getTabelle(v.liga.id).subscribe({
          next: (tabelle) => {
            this.berechneStatistiken(tabelle);
            this.loading = false;
          },
          error: () => { this.loading = false; }
        });
      }
    });
  }

  private berechneStatistiken(tabelle: Tabelleneintrag[]): void {
    this.treffsichersteVereine = [...tabelle]
      .sort((a, b) => b.tore - a.tore)
      .slice(0, 5);

    this.besteAbwehren = [...tabelle]
      .sort((a, b) => a.gegentore - b.gegentore)
      .filter(e => e.spiele > 0)
      .slice(0, 5);

    this.meisteSiege = [...tabelle]
      .sort((a, b) => b.siege - a.siege)
      .slice(0, 5);

    this.gesamtSpiele = tabelle.reduce((s, e) => s + e.spiele, 0) / 2;
    this.gesamtTore = tabelle.reduce((s, e) => s + e.tore, 0);
  }
}
