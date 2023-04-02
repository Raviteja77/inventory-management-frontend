import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonAuthorizedGuard } from './auth/guards/non-authorized.guard';
import { LoginComponent } from './features/login/login.component';
import { RegistrationComponent } from './features/registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NonAuthorizedGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [NonAuthorizedGuard] },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
