import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { User } from "./AuthService";

class UserService {
  private db = getFirestore();

  async getUserByID(id: string): Promise<User> {
    const docRef = doc(this.db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const profilePicture = docSnap.data().photoURL;
      const user = docSnap.data() as User;
      user.uid = docSnap.id;
      user.profilePicture = profilePicture;
      return user;
    } else {
      console.log("No such document!");
      return {
        uid: "",
        email: "",
        displayName: "",
        profilePicture: "",
        isVerified: false,
      };
    }
  }
}
export default UserService;
