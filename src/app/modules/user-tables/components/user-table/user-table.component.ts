import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserResponse } from 'src/app/models/user-response';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'birthDate', 'email', 'phoneNumber', 'update', 'delete'];
  users: UserResponse[] = [];
  dataSource = new MatTableDataSource<UserResponse>(this.users);
  delete: boolean = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private usersService: UsersService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.updateTable();
    this.dataSource.paginator = this.paginator;
  }

  updateTable() {
    this.usersService.getUsers().subscribe(
      data => {
        this.users = data
        this.dataSource = new MatTableDataSource<UserResponse>(this.users);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  
  initDelete(idUser: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.deleteUser(idUser).subscribe(data => {
          this.snackBar.open('Usuario eliminado', 'Entendido', {
            duration: 1000
          });
          this.updateTable();
        }, error => {
          this.snackBar.open('Ocurrio un error al intentar eliminar un registro', 'Entendido', {
            duration: 1000
          });
        });
      }
    });
  }
}
