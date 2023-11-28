import AuthService from "./AuthService";
import PostService from "./PostService";

export class AppService {
  authService: AuthService;
  postService: PostService;

  constructor() {
    this.authService = new AuthService();
    this.postService = new PostService();
  }

  auth() {
    return this.authService;
  }

  post() {
    return this.postService;
  }
}
