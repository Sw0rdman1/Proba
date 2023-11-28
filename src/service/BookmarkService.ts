import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Post } from "./PostService";

class BookmarkService {
  private db = getFirestore();
  private bookamrksCollection = collection(this.db, "bookmarks");

  async isPostBookmarked(postID: string, userID: string): Promise<boolean> {
    const q = query(
      this.bookamrksCollection,
      where("postID", "==", postID),
      where("userID", "==", userID)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  }

  async updateNumberOfBookmarksPost(post: Post) {
    const docRef = doc(this.db, "posts", post.id);
    await updateDoc(docRef, { numberOfBookmarks: post.numberOfBookmarks });
  }

  async bookmarkPost(post: Post, userID: string): Promise<void> {
    const bookmark = {
      postID: post.id,
      userID,
      createdAt: new Date(),
    };
    const docRef = await addDoc(this.bookamrksCollection, bookmark);
    await this.updateNumberOfBookmarksPost(post);
  }

  async unbookmarkPost(post: Post, userID: string): Promise<void> {
    const q = query(
      this.bookamrksCollection,
      where("postID", "==", post.id),
      where("userID", "==", userID)
    );
    const querySnapshot = await getDocs(q);
    const docRef = querySnapshot.docs[0].ref;

    await deleteDoc(docRef);
    await this.updateNumberOfBookmarksPost(post);
  }

  async interactWithPost(
    post: Post,
    userID: string,
    actionToPreform: string
  ): Promise<void> {
    if (actionToPreform !== "bookmark") {
      await this.unbookmarkPost(post, userID);
    } else {
      await this.bookmarkPost(post, userID);
    }
  }
}

export default BookmarkService;
