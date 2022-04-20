import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { KanbanComponent } from './kanban/kanban.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthGuardService } from './service/auth-guard.service';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo:'/kanban',
    pathMatch:'full'},
  {
    path:'kanban',
    component:KanbanComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'login',
    component:LoginFormComponent
  },
  
  {
    path: 'register',
    component:RegisterFormComponent
  },
  {
  path: 'kanbans/:kanbanId',  
    component: TaskComponent ,
    canActivate:[AuthGuardService]
  },
  {
  path:"about",
  component:AboutUsComponent
  },
  {
  path:"privacy",
  component:PrivacyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  


}
