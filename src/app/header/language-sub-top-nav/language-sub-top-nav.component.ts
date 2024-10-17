import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-language-sub-top-nav',
  standalone: true,
  imports: [MenubarModule, CommonModule],
  templateUrl: './language-sub-top-nav.component.html',
  styleUrl: './language-sub-top-nav.component.scss'
})
export class LanguageSubTopNavComponent implements OnInit {
  public items: MenuItem[] | undefined;

  public ngOnInit() {
      this.items = [
          {
              label: 'Home'
          },
          {
              label: 'Features'
          },
          {
              label: 'MCQ'
          },
          {
              label: 'Interview'
          },
          {
              label: 'Coding'
          },
          {
              label: 'Quiz'
          },
          {
              label: 'Blog'
          }
      ]
  }
}
