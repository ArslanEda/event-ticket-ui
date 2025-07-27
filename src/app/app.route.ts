import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { LoginComponent } from './pages/user/login/login';
import { RegisterComponent } from './pages/user/register/register';
import { EventListComponent } from './pages/event/events';
import { AdminPanelComponent } from './pages/admin/admin';
import { AccountComponent } from './pages/account/account';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'events', component: EventListComponent },
    { path: 'admin', component: AdminPanelComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'account', component: AccountComponent}

];
