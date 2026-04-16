import { Verein } from './verein.model';

export interface Spiel {
  id: number;
  spieltag: number;
  saison: number;
  heimVerein: Verein;
  gastVerein: Verein;
  heimTore: number | null;
  gastTore: number | null;
  gespielt: boolean;
}
