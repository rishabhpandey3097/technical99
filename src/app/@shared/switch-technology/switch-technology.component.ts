import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-switch-technology',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './switch-technology.component.html',
  styleUrl: './switch-technology.component.scss'
})
export class SwitchTechnologyComponent {
  @Input() containerType: boolean = false;
  public selectedIndex: number = 0;
  public menus = [
    {
      name: 'Language',
      menuItems: ['Java', 'Python', 'JavaScript', 'CPP', 'PHP']
    },
    {
      name: 'DSA',
      menuItems: ['Data Structure', 'Algorithm']
    },
    {
      name: 'Database',
      menuItems: ['SQL', 'MongoDB']
    },
    {
      name: 'Tools',
      menuItems: ['Jira', 'Git']
    },
    {
      name: 'Competitive',
      menuItems: ['Aptitude', 'Reasoning']
    },
  ]

  public currentMenu = this.menus[0];

  public changeMenuItems(index) {
    this.selectedIndex = index;
    this.currentMenu = this.menus[index]
  }
}
