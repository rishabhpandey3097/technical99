import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { TemplateGeneratorComponent } from '@app/template-generator/template-generator.component';
import { BlogsSidebarComponent } from '@app/@shared/blogs-sidebar/blogs-sidebar.component';
import { SwitchTechnologyComponent } from '@app/@shared/switch-technology/switch-technology.component';
import { TutorialSidebarComponent } from '@app/@shared/tutorial-sidebar/tutorial-sidebar.component';

// PrimeNg Modules
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout.routing.module';
import { LeftPanelComponent } from '@app/@shared/left-panel/left-panel.component';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        FormsModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        ButtonModule,
        CommonModule,
        SwitchTechnologyComponent,
        TutorialSidebarComponent,
        BlogsSidebarComponent,
        TemplateGeneratorComponent,
        LayoutRoutingModule,
        LeftPanelComponent
    ],
    providers: [ConfirmationService],
})
export class LayoutModule { }
