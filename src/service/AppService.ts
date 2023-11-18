import AuthService from "./AuthService";

export class AppService {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  auth() {
    return this.authService;
  }
}
