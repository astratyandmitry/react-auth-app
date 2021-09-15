export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextStore {
  isLoggedIn: boolean;

  /**
   * Login user
   */
  doLogin (credentials: LoginCredentials): void;

  /**
   * Logout user
   */
  doLogout (): void;
}

export enum LoginFormReducerActionType {
  CHANGE = 'CHANGE',
  BLUR = 'BLUR',
}

export interface LoginFormReducerAction {
  type: LoginFormReducerActionType;
  field: string;
  value?: any;
}

export interface LoginReducerState {
  email: LoginFormReducerField;
  password: LoginFormReducerField;
}

export interface LoginFormReducerField {
  value: any;
  isValid: boolean | null;

  validate (value: string): boolean;
}
