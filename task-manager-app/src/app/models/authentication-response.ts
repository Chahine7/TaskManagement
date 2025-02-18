import {UserDTO} from "./user-dto";

export interface AuthenticationResponse {
  token?: string;
  user?: UserDTO;
}
