import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-sub-top-nav',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './sub-top-nav.component.html',
  styleUrl: './sub-top-nav.component.scss',
})
export class SubTopNavComponent implements OnInit {
  public subMenuItems: MenuItem[] | undefined;

  public ngOnInit(): void {
    this.subMenuItems = [
      {
        label: 'Language',
        items: [
          { label: 'Java' },
          { label: 'Python' },
          { label: 'PHP' },
          { label: 'CPP' },
          { label: 'C' },
        ],
      },
      {
        label: 'DSA',
        items: [{ label: 'Data Structure' }],
      },
      {
        label: 'Database',
        items: [{ label: 'SQL' }],
      },
      {
        label: 'Tools',
        items: [{ label: 'Git' }, { label: 'Jira' }],
      },
      {
        label: 'Competitive',
        items: [{ label: 'Aptitude' }, { label: 'Reasoning' }],
      },
    ];
  }
}
