import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IncomeComponent } from './pages/income/income.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    IncomeComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class AppComponent {
  showFiller = false;
}
