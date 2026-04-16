import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { VereinService } from '../../services/verein.service';

interface SubItem {
  label: string;
  route: string;
}

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  children?: SubItem[];
}

@Component({
  selector: 'app-game-layout',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  templateUrl: './game-layout.component.html',
  styleUrl: './game-layout.component.scss'
})
export class GameLayoutComponent implements OnInit {
  vereinId!: number;
  vereinName = '';

  menu: MenuItem[] = [
    {
      label: 'Mannschaft', route: 'mannschaft', icon: 'groups',
      children: [
        { label: 'Kader',       route: 'mannschaft/kader' },
        { label: 'Aufstellung', route: 'mannschaft/aufstellung' },
      ]
    },
    {
      label: 'Liga', route: 'liga', icon: 'emoji_events',
      children: [
        { label: 'Tabelle',     route: 'liga/tabelle' },
        { label: 'Spielplan',   route: 'liga/spielplan' },
        { label: 'Statistiken', route: 'liga/statistiken' },
      ]
    },
    { label: 'Training', route: 'training', icon: 'fitness_center' },
    { label: 'Finanzen', route: 'finanzen', icon: 'euro' },
    { label: 'Umfeld',   route: 'umfeld',   icon: 'stadium' },
    { label: 'Jugend',   route: 'jugend',   icon: 'child_care' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vereinService: VereinService,
  ) {}

  ngOnInit(): void {
    this.vereinId = Number(this.route.snapshot.paramMap.get('vereinId'));
    this.vereinService.getById(this.vereinId).subscribe({
      next: (v) => this.vereinName = v.name,
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route], { relativeTo: this.route });
  }

  isActive(item: MenuItem): boolean {
    return this.router.url.includes(`/${item.route}`);
  }

  zurueck(): void {
    this.router.navigate(['/']);
  }
}
