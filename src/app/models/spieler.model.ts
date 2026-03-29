export type Position =
  | 'TW' | 'IV' | 'LV' | 'RV'
  | 'DM' | 'ZM' | 'LM' | 'RM' | 'OM'
  | 'LA' | 'RA' | 'HS' | 'ST';

export type KaderTyp = 'Profi' | 'Amateur' | 'JugendA' | 'JugendB' | 'JugendC';

export interface Spieler {
  id: number;
  name: string;
  alter: number;
  nationalitaet: string;
  position: Position;
  kader: KaderTyp;
  staerke: number;
  talent: number;
  wert: number;
  // Technisch
  pass: number;
  ballkontrolle: number;
  schusstechnik: number;
  schussstaerke: number;
  schnelligkeit: number;
  ausdauer: number;
  stellungsspiel: number;
  entscheidungen: number;
  kopfball: number;
  zweikampf: number;
  dribbling: number;
  linkerFuss: number;
  rechterFuss: number;
  fuehrungsqualitaet: number;
  disziplin: number;
  // Torwart
  talentTW: number;
  strafraumbeherrschung: number;
  fangsicherheit: number;
  reflexe: number;
}
