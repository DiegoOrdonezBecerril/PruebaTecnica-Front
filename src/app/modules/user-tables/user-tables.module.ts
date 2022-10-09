import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTablesRoutingModule } from './user-tables-routing.module';
import { UserTableComponent } from './components/user-table/user-table.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material';
import { UpdateUserFormComponent } from './components/update-user-form/update-user-form.component';
import { DatePipe } from '@angular/common';
import { TitleBarComponent } from './components/title-bar/title-bar.component'

@NgModule({
  declarations: [UserTableComponent, DeleteDialogComponent, CreateUserFormComponent, UpdateUserFormComponent, TitleBarComponent],
  imports: [
    CommonModule,
    UserTablesRoutingModule,
    FormsModule, 
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatDialogModule, 
    MatFormFieldModule, 
    MatSnackBarModule, 
    RouterModule, 
    MatInputModule, 
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  entryComponents: [DeleteDialogComponent]
})
export class UserTablesModule { }
