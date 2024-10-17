import { Component } from '@angular/core';
import { LanguageSubTopNavComponent } from '../../header/language-sub-top-nav/language-sub-top-nav.component';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-java',
  standalone: true,
  imports: [LanguageSubTopNavComponent, FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, AccordionModule, TabViewModule, CommonModule, CardModule],
  templateUrl: './java.component.html',
  styleUrl: './java.component.scss'
})
export class JavaComponent {
  
}
