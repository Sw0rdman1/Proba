import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Purpose: Service for authentication.
export interface User {
  displayName: string;
  email: string;
  isVerified: boolean;
  profilePicture: string;
  uid: string;
}

class AuthService {
  private authentication = getAuth();

  async authenticateUser(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.authentication,
        email,
        password
      );
      const user = userCredential.user;

      const idToken = await user.getIdToken();
      return { user, idToken };
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return { error: firebaseError.code };
    }
  }

  async logOut() {
    this.authentication.signOut().catch((error) => {
      console.log("Error logging out:", error);
    });
  }
}

export default AuthService;
