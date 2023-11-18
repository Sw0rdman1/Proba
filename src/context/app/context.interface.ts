import { AppService } from "../../service/AppService";
import { User } from "../../service/AuthService";

export interface Action {
  type: string;
  payload?: any;
}

export interface State {
  user: User | null;
  loading: {
    user: boolean;
    data: boolean;
  };
  posts: any[];
  app: AppService;
}
