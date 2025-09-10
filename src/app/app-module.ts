import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Paytransaction } from './paytransaction/paytransaction';
import { Acctransaction } from './acctransaction/acctransaction';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserLogin } from './login/user-login/user-login';

@NgModule({
  declarations: [
    App,
    Paytransaction,
    Acctransaction,
    UserLogin
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ]
  ,
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
