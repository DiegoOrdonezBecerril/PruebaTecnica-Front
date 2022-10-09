import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUserRequest } from 'src/app/models/create-user-request';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  isLoading: Boolean;
  createUserForm: FormGroup;
  userRequest: CreateUserRequest;

  constructor(private location: Location, private usersService: UsersService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      birthDate: new FormControl('', [Validators.required]), 
      email: new FormControl('', [Validators.required, Validators.email]), 
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')])
    });
  }

  onClickBack() {
    this.location.back();
  }

  onSubmit() {
    if(this.createUserForm.valid){
      this.userRequest = {
        firstName: this.createUserForm.get('firstName').value, 
        lastName: this.createUserForm.get('lastName').value, 
        birthDate: this.createUserForm.get('birthDate').value, 
        email: this.createUserForm.get('email').value, 
        phoneNumber: this.createUserForm.get('phoneNumber').value
      };

      this.isLoading = true;

      this.usersService.createUser(this.userRequest).subscribe(
        data =>{
          this.isLoading = false;
          this.onClickBack();
        }, err => {
          this.isLoading = false;
          this.snackBar.open('Ocurrio un error al agregar el usuario', 'Entendido', {
            duration: 1000
          });
        }
      );
    }
  }
}
