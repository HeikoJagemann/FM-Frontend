import { Routes } from '@angular/router';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { SpielerListeComponent } from './components/spieler-liste/spieler-liste.component';
import { SpielerDetailComponent } from './components/spieler-detail/spieler-detail.component';

export const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'spiel/:vereinId', component: SpielerListeComponent },
  { path: 'spiel/:vereinId/spieler/:id', component: SpielerDetailComponent },
  { path: '**', redirectTo: '' }
];
