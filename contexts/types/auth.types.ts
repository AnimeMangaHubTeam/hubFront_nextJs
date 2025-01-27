export interface IUser {
    id: number;
    userName: string;
    email: string;
    roles: string[];
  }
  
  export interface IAuth {
    isAuthenticated: boolean;
    user: IUser | null;
  }
  
  export interface IAuthContext {
    auth: IAuth;
    setAuth: (auth: IAuth) => void;
  }