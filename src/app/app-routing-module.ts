import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLogin } from './login/user-login/user-login';
import { UserDashboard } from './user-dashboard/user-dashboard';


const routes: Routes = [
  // Default route → login page
  { path: '', component: UserLogin },
  
  // If you want an explicit `/login` path too
  { path: 'login', component: UserLogin },
  
  // If you want an explicit `/login` path too
  { path: 'dashboard', component: UserDashboard },
  
  // Wildcard route for unknown paths → redirect to login
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
