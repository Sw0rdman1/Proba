// Purpose: Service for authentication.
export interface User {
  displayName: string;
  email: string;
  isVerified: boolean;
  profilePicture: string;
  uid: string;
}

class AuthService {}

export default AuthService;
