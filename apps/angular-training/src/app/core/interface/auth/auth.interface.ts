export interface AuthLogin {
  username: string;
  password: string;
}

export interface UserAuthenticated {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
