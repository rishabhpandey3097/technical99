import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-mob-menu',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './mob-menu.component.html',
  styleUrl: './mob-menu.component.scss'
})
export class MobMenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'Training',
        icon: 'pi pi-graduation-cap'
      },
      {
        label: 'Enquiry',
        icon: 'pi pi-phone'
      },
      {
        label: 'Assessment',
        icon: 'pi pi-pen-to-square'
      },
      {
        label: 'More',
        icon: 'pi pi-bars',
        items: [
          {
            label: 'Community',
            icon: 'pi pi-bolt'
          },
          {
            label: 'Apply for Job',
            icon: 'pi pi-server'
          },
          {
            label: 'Verify Certificate',
            icon: 'pi pi-pencil'
          },
          {
            label: 'Templates',
            icon: 'Help Desk'
          }
        ]
      }
    ]
  }
}
