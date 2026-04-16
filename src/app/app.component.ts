import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { version } from '../../package.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly version = version;
}
