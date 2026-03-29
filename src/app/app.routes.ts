import { Routes } from '@angular/router';
import { SpielerListeComponent } from './components/spieler-liste/spieler-liste.component';
import { SpielerDetailComponent } from './components/spieler-detail/spieler-detail.component';

export const routes: Routes = [
  { path: '', component: SpielerListeComponent },
  { path: 'spieler/:id', component: SpielerDetailComponent },
  { path: '**', redirectTo: '' }
];
