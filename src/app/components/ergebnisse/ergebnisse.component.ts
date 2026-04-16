import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LigaService } from '../../services/liga.service';
import { VereinService } from '../../services/verein.service';
import { Spiel } from '../../models/spiel.model';

interface Spieltag {
  nr: number;
  spiele: Spiel[];
}

@Component({
  selector: 'app-ergebnisse',
  imports: [CommonModule, MatExpansionModule, MatProgressSpinnerModule],
  templateUrl: './ergebnisse.component.html',
  styleUrl: './ergebnisse.component.scss'
})
export class ErgebnisseComponent implements OnInit {
  spieltage: Spieltag[] = [];
  loading = true;
  ligaName = '';
  meinVereinId = 0;

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
        this.ligaService.getSpielplan(v.liga.id).subscribe({
          next: (spiele) => {
            this.spieltage = this.gruppiereNachSpieltag(spiele);
            this.loading = false;
          },
          error: () => { this.loading = false; }
        });
      }
    });
  }

  private gruppiereNachSpieltag(spiele: Spiel[]): Spieltag[] {
    const map = new Map<number, Spiel[]>();
    for (const s of spiele) {
      if (!map.has(s.spieltag)) map.set(s.spieltag, []);
      map.get(s.spieltag)!.push(s);
    }
    return Array.from(map.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([nr, spiele]) => ({ nr, spiele }));
  }
}
