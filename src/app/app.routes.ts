import { Routes } from '@angular/router';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { GameLayoutComponent } from './components/game-layout/game-layout.component';
import { MannschaftLayoutComponent } from './components/mannschaft-layout/mannschaft-layout.component';
import { SpielerListeComponent } from './components/spieler-liste/spieler-liste.component';
import { SpielerDetailComponent } from './components/spieler-detail/spieler-detail.component';
import { AufstellungComponent } from './components/aufstellung/aufstellung.component';
import { TrainingComponent } from './components/training/training.component';
import { FinanzenComponent } from './components/finanzen/finanzen.component';
import { UmfeldComponent } from './components/umfeld/umfeld.component';
import { JugendComponent } from './components/jugend/jugend.component';

export const routes: Routes = [
  { path: '', component: StartScreenComponent },
  {
    path: 'spiel/:vereinId',
    component: GameLayoutComponent,
    children: [
      { path: '', redirectTo: 'mannschaft', pathMatch: 'full' },
      {
        path: 'mannschaft',
        component: MannschaftLayoutComponent,
        children: [
          { path: '',            redirectTo: 'kader', pathMatch: 'full' },
          { path: 'kader',       component: SpielerListeComponent },
          { path: 'kader/spieler/:id', component: SpielerDetailComponent },
          { path: 'aufstellung', component: AufstellungComponent },
        ]
      },
      { path: 'training',  component: TrainingComponent },
      { path: 'finanzen',  component: FinanzenComponent },
      { path: 'umfeld',    component: UmfeldComponent },
      { path: 'jugend',    component: JugendComponent },
      { path: 'jugend/spieler/:id', component: SpielerDetailComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
