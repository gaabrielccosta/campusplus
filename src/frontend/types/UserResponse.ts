import { Aluno } from "./Aluno";
import { Professor } from "./Professor";
import { User } from "./User";

export interface UserResponse {
  authenticated: boolean;
  user: User | null;
  aluno?: Aluno | null;
  professor?: Professor | null;
}
