import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AccountSummaryComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
