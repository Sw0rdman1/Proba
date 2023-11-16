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
    login: boolean;
    register: boolean;
  };
  posts: any[];
}
