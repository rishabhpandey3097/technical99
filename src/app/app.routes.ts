import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LanguageComponent } from './pages/language/language.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'language/:lang', pathMatch: 'full', component: LanguageComponent },
    { path: 'module/:moduleName', pathMatch: 'full', component: TutorialComponent },
];
