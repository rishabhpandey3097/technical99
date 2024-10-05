import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss',
})
export class TopNavComponent {
  public navActions = [
    { name: 'Home', icon: 'pi pi-home' },
    { name: 'Training', icon: 'pi pi-graduation-cap' },
    { name: 'Assessment', icon: 'pi pi-book' },
    { name: 'Community', icon: 'pi pi-globe' },
    { name: 'Login', icon: 'pi pi-user' },
  ];
}
