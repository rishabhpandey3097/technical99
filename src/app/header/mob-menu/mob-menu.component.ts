import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-mob-menu',
  standalone: true,
  imports: [MenuModule, ButtonModule],
  templateUrl: './mob-menu.component.html',
  styleUrl: './mob-menu.component.scss'
})
export class MobMenuComponent implements OnInit {
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                items: [
                    {
                        label: 'Community'
                    },
                    {
                        label: 'Apply for Job'
                    },
                    {
                        label: 'Verify Certificate'
                    },
                    {
                        label: 'Help Desk'
                    }
                ]
            }
        ];
    }
}
