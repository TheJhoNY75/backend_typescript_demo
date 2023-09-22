export interface UserLogin {
  email: string;
  password: string;
}

export interface User extends UserLogin {
  first_name: string;
  last_name: string;
}

export interface UserResponse extends User {
  id: string;
  created_at: Date;
  updated_at: Date;
}