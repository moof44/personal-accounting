import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IncomeComponent } from './pages/income/income.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IncomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
