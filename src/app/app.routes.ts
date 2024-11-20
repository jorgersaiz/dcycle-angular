import { Routes } from '@angular/router';
import { Exercise1Component } from './pages/exercise1/exercise1.component';
import { Exercise2Component } from './pages/exercise2/exercise2.component';

export const routes: Routes = [
    { path: '', redirectTo: 'exercise1', pathMatch: 'full' },
    { path: 'exercise1', component: Exercise1Component},
    { path: 'exercise2', component: Exercise2Component},
    { path: '**', redirectTo: 'exercise1', pathMatch: 'full' }
];
