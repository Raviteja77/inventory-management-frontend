import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonAuthorizedGuard } from './auth/guards/non-authorized.guard';
import { LoginComponent } from './features/login/login.component';
import { RegistrationComponent } from './features/registration/registration.component';
import { ItemFormComponent } from './shared/components';
import { ItemComponent } from './features/item/item.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { ItemsComponent } from './features/items/items.component';
import { VendorsComponent } from './features/vendors/vendors.component';
import { ReportsComponent } from './features/reports/reports.component';
import { RequestsComponent } from './features/requests/requests.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NonAuthorizedGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [NonAuthorizedGuard] },
  { path: 'items', component: ItemsComponent, canActivate: [AuthorizedGuard] },
  { path: 'items/add', component: ItemFormComponent, canActivate: [AuthorizedGuard] },
  { path: 'items/edit/:id', component: ItemFormComponent, canActivate: [AuthorizedGuard] },
  { path: 'items/:id', component: ItemComponent, canActivate: [AuthorizedGuard] },
  { path: 'vendors', component: VendorsComponent, canActivate: [AuthorizedGuard] },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthorizedGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthorizedGuard] },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
