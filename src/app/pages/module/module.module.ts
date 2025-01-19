import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleContentComponent } from './module-content/module-content.component';
import { ModuleRouting } from './module.routing';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ModuleMainContentComponent } from './module-main-content/module-main-content.component';
import { TemplateGeneratorComponent } from '@app/template-generator/template-generator.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  declarations: [ModuleContentComponent, ModuleMainContentComponent],
  imports: [
    CommonModule,
    ModuleRouting,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    TemplateGeneratorComponent,
    OverlayPanelModule
  ]
})
export class ModuleModule { }
