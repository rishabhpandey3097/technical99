import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LanguageComponent } from './pages/language/language.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'language/:lang', pathMatch: 'full', component: LanguageComponent },
    { path: 'layout', loadChildren: () => import('./pages/layout/layout.module').then(m => m.LayoutModule) },
];
