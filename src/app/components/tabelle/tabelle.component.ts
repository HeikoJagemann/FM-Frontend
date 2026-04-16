import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LigaService } from '../../services/liga.service';
import { VereinService } from '../../services/verein.service';
import { Tabelleneintrag } from '../../models/tabelleneintrag.model';

@Component({
  selector: 'app-tabelle',
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './tabelle.component.html',
  styleUrl: './tabelle.component.scss'
})
export class TabelleComponent implements OnInit {
  tabelle: Tabelleneintrag[] = [];
  loading = true;
  ligaName = '';
  meinVereinId = 0;

  spalten = ['platz', 'verein', 'sp', 'g', 'u', 'n', 'tore', 'td', 'pkt'];

  constructor(
    private route: ActivatedRoute,
    private ligaService: LigaService,
    private vereinService: VereinService
  ) {}

  ngOnInit(): void {
    const vereinId = Number(this.route.snapshot.parent?.parent?.paramMap.get('vereinId'));
    this.meinVereinId = vereinId;
    this.vereinService.getById(vereinId).subscribe({
      next: (v) => {
        this.ligaName = v.liga.name;
        this.ligaService.getTabelle(v.liga.id).subscribe({
          next: (t) => { this.tabelle = t; this.loading = false; },
          error: () => { this.loading = false; }
        });
      }
    });
  }
}
