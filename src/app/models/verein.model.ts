import { Liga } from './liga.model';

export interface Verein {
  id: number;
  name: string;
  staerke: number;
  liga: Liga;
}
