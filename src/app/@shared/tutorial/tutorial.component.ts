import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SwitchTechnologyComponent } from '../switch-technology/switch-technology.component';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, CommonModule, SwitchTechnologyComponent],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss'
})
export class TutorialComponent {

}
