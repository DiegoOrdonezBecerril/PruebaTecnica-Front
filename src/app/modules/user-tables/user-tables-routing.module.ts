import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { UpdateUserFormComponent } from './components/update-user-form/update-user-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full'
  },
  {
    path: 'table',
    component: UserTableComponent
  },
  {
    path: 'create',
    component: CreateUserFormComponent
  },
  {
    path: 'update/:idUser',
    component: UpdateUserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTablesRoutingModule { }
