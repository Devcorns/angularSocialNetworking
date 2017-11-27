import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";


import { UserModule } from "./user/user.module";
import { AdminComponent } from './admin/admin.component';
import { PermissionsComponent } from './admin/permissions/permissions.component';
import { CompanyoverviewComponent } from './admin/companyoverview/companyoverview.component';
import { TaskpanelComponent } from './admin/taskpanel/taskpanel.component';
import * as $ from 'jquery';
@NgModule({
  declarations: [
    AppComponent,LoginComponent, SignupComponent, AdminComponent, PermissionsComponent, CompanyoverviewComponent, TaskpanelComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
