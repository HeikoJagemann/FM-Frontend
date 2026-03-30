import { Component } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-mannschaft-layout',
  imports: [RouterModule, MatTabsModule],
  templateUrl: './mannschaft-layout.component.html',
  styleUrl: './mannschaft-layout.component.scss'
})
export class MannschaftLayoutComponent {

  tabs = [
    { label: 'Kader',       route: 'kader' },
    { label: 'Aufstellung', route: 'aufstellung' },
  ];

  constructor(public router: Router, private route: ActivatedRoute) {}

  activeIndex(): number {
    const idx = this.tabs.findIndex(t => this.router.url.includes(`/${t.route}`));
    return idx >= 0 ? idx : 0;
  }

  navigateTo(index: number): void {
    this.router.navigate([this.tabs[index].route], { relativeTo: this.route });
  }
}
