import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: ':moduleName/:lang',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../module/module.module').then((p) => p.ModuleModule),
            },
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule { }
