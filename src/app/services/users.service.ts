import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserRequest } from '../models/create-user-request';
import { UpdateUserRequest } from '../models/update-user-request';
import { UserResponse } from '../models/user-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_URI = '/api/users';

  constructor(private httpClient: HttpClient) { }

  public createUser(createUserRequest: CreateUserRequest) : Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(`${this.API_URI}/`, createUserRequest);
  }

  public updateUser(idUser: number, updateUserRequest: UpdateUserRequest) : Observable<UserResponse> {
    return this.httpClient.patch<UserResponse>(`${this.API_URI}/${idUser}`, updateUserRequest);
  }

  public deleteUser(idUser: number) : Observable<UserResponse> {
    return this.httpClient.delete<UserResponse>(`${this.API_URI}/${idUser}`);
  }

  public getUsers() : Observable<Array<UserResponse>> {
    return this.httpClient.get<Array<UserResponse>>(`${this.API_URI}/`);
  }

  public getUser(idUser: number) : Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(`${this.API_URI}/${idUser}`);
  }
}
