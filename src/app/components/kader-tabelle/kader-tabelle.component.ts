import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Spieler } from '../../models/spieler.model';

@Component({
  selector: 'app-kader-tabelle',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  templateUrl: './kader-tabelle.component.html',
  styleUrl: './kader-tabelle.component.scss'
})
export class KaderTabelleComponent {
  @Input() spieler: Spieler[] = [];
  @Output() detailClick  = new EventEmitter<Spieler>();
  @Output() loeschenClick = new EventEmitter<Spieler>();

  displayedColumns = ['name', 'alter', 'position', 'staerke', 'wert', 'aktionen'];

  wertFormatiert(wert: number): string {
    if (wert >= 1_000_000) return `${(wert / 1_000_000).toFixed(1)}M €`;
    if (wert >= 1_000)     return `${(wert / 1_000).toFixed(0)}K €`;
    return `${wert} €`;
  }

  onLoeschen(s: Spieler, event: Event): void {
    event.stopPropagation();
    this.loeschenClick.emit(s);
  }
}
