import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Importing Components
 */
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TaskpanelComponent } from './admin/taskpanel/taskpanel.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
   {
    path:'taskpanel',
    component: TaskpanelComponent
  },
  {
    path:'user',
    loadChildren: './user/user.module#UserModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
