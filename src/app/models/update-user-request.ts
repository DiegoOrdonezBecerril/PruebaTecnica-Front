import { CreateUserRequest } from "./create-user-request";

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}
