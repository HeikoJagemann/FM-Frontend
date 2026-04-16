import { Verein } from './verein.model';

export interface Tabelleneintrag {
  platz: number;
  verein: Verein;
  spiele: number;
  siege: number;
  unentschieden: number;
  niederlagen: number;
  tore: number;
  gegentore: number;
  tordifferenz: number;
  punkte: number;
}
