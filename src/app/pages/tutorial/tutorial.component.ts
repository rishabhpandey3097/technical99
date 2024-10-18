import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlogsSidebarComponent } from '@app/@shared/blogs-sidebar/blogs-sidebar.component';
import { SwitchTechnologyComponent } from '@app/@shared/switch-technology/switch-technology.component';
import { TutorialSidebarComponent } from '@app/@shared/tutorial-sidebar/tutorial-sidebar.component';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [CommonModule, SwitchTechnologyComponent, TutorialSidebarComponent, BlogsSidebarComponent],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss'
})
export class TutorialComponent {

}
