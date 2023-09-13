export interface UserDTO {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  company?: string;
}
