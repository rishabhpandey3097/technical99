import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleContentComponent } from './module-content/module-content.component';
import { ModuleMainContentComponent } from './module-main-content/module-main-content.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ModuleContentComponent
    },
    {
        path: ':topic',
        component: ModuleMainContentComponent
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModuleRouting { }