import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogsSidebarComponent } from '@app/@shared/blogs-sidebar/blogs-sidebar.component';
import { SwitchTechnologyComponent } from '@app/@shared/switch-technology/switch-technology.component';
import { TutorialSidebarComponent } from '@app/@shared/tutorial-sidebar/tutorial-sidebar.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, CommonModule, SwitchTechnologyComponent, TutorialSidebarComponent, BlogsSidebarComponent],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss'
})
export class TutorialComponent {

}
