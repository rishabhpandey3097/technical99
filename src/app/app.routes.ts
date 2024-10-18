import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JavaComponent } from './pages/java/java.component';
import { TutorialComponent } from './@shared/tutorial/tutorial.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'app-java', pathMatch: 'full', component: JavaComponent},
    {path: 'tutorial', pathMatch: 'full', component: TutorialComponent},
];
