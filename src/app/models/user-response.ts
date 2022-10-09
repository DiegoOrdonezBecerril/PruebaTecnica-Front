import { CreateUserRequest } from "./create-user-request";

export interface UserResponse extends CreateUserRequest {
    idUser: number;
}
