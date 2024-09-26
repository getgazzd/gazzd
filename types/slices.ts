export interface CentraError {
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
}

export interface UserStateError {
  centra: CentraError;
  backend: {};
  uncaught?: string[];
}
