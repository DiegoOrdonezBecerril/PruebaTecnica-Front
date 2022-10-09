import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UpdateUserRequest } from 'src/app/models/update-user-request';
import { UsersService } from 'src/app/services/users.service';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user-response';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.scss']
})
export class UpdateUserFormComponent implements OnInit {
  
  idUser: number;
  isLoading: Boolean;
  updateUserForm: FormGroup;
  userRequest: UpdateUserRequest;
  userResponse: UserResponse;

  constructor(
    private location: Location, 
    private usersService: UsersService, 
    private snackBar: MatSnackBar, 
    private activedRoute: ActivatedRoute,
    private router: Router, 
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe((params: Params) => {
      if (params.idUser != null) {
        this.idUser = params.idUser;
        this.updateUser();
      }
      
    });

    this.updateUserForm = new FormGroup({
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
    if(this.updateUserForm.valid){
      this.userRequest = {
        firstName: this.updateUserForm.get('firstName').value, 
        lastName: this.updateUserForm.get('lastName').value, 
        birthDate: this.updateUserForm.get('birthDate').value, 
        email: this.updateUserForm.get('email').value, 
        phoneNumber: this.updateUserForm.get('phoneNumber').value
      };

      this.isLoading = true;

      this.usersService.updateUser(this.idUser, this.userRequest).subscribe(
        data =>{
          this.isLoading = false;
          this.onClickBack();
        }, err => {
          this.isLoading = false;
          this.showNotFoundAlert();
        }
      );
    }
  }

  updateUser() {
    this.usersService.getUser(this.idUser).subscribe(data => {
      if (data.idUser == this.idUser) {
        this.userResponse = data;
        this.updateReactiveForm();
      } else {
        this.router.navigate(['users/table']);
        this.showNotFoundAlert();
      }
    }, error => {
      this.location.back;
      this.showNotFoundAlert();
    });
  }

  showNotFoundAlert() {
    this.snackBar.open('Ocurrio un error al obtener los datos del usuario', 'Entendido', {
      duration: 2000
    });
  }

  updateReactiveForm() {
    this.updateUserForm.setValue({
      firstName: this.userResponse.firstName, 
      lastName: this.userResponse.lastName, 
      birthDate: this.datepipe.transform(this.userResponse.birthDate, 'yyyy-MM-dd'), 
      email: this.userResponse.email, 
      phoneNumber: this.userResponse.phoneNumber
    })
  }
}
