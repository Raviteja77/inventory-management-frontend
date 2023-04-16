import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './features/login/login.module';
import { RegistrationModule } from './features/registration/registration.module';
import { SharedModule } from './shared/shared.module';
import { ItemsModule } from './features/items/items.module';
import { ItemModule } from './features/item/item.module';
import { VendorsModule } from './features/vendors/vendors.module';
import { ReportsModule } from './features/reports/reports.module';
import { RequestsModule } from './features/requests/requests.module';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LoginModule,
    RegistrationModule,
    HttpClientModule,
    ItemsModule,
    ItemModule,
    VendorsModule,
    ReportsModule,
    RequestsModule,
    PipesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
