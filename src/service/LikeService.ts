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

class LikeService {
  private db = getFirestore();
  private likesCollection = collection(this.db, "likes");
  private commentLikesCollection = collection(this.db, "commentLikes");

  async isPostLiked(postID: string, userID: string): Promise<boolean> {
    const q = query(
      this.likesCollection,
      where("postID", "==", postID),
      where("userID", "==", userID)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  }

  async isCommentLiked(commentID: string, userID: string): Promise<boolean> {
    const q = query(
      this.commentLikesCollection,
      where("commentID", "==", commentID),
      where("userID", "==", userID)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  }

  async updateNumberOfLikesPost(post: Post) {
    const docRef = doc(this.db, "posts", post.id);
    await updateDoc(docRef, { numberOfLikes: post.numberOfLikes });
  }

  async likePost(post: Post, userID: string): Promise<void> {
    const like = {
      postID: post.id,
      userID,
      createdAt: new Date(),
    };
    const docRef = await addDoc(this.likesCollection, like);
    await this.updateNumberOfLikesPost(post);
  }

  async unlikePost(post: Post, userID: string): Promise<void> {
    const q = query(
      this.likesCollection,
      where("postID", "==", post.id),
      where("userID", "==", userID)
    );
    const querySnapshot = await getDocs(q);
    const docRef = querySnapshot.docs[0].ref;

    await deleteDoc(docRef);
    await this.updateNumberOfLikesPost(post);
  }

  async interactWithPost(
    post: Post,
    userID: string,
    actionToPreform: string
  ): Promise<void> {
    if (actionToPreform === "unlike") {
      await this.unlikePost(post, userID);
    } else {
      await this.likePost(post, userID);
    }
  }

  //   async updateNumberOfLikesComment(comment: Comment) {
  //     const docRef = doc(this.db, "comments", comment.id);
  //     await updateDoc(docRef, { numberOfLikes: comment.numberOfLikes });
  //   }

  //   async likeComment(comment: Comment, userID: string): Promise<void> {
  //     const like = {
  //       commentID: comment.id,
  //       userID,
  //       createdAt: new Date(),
  //     };
  //     const docRef = await addDoc(this.commentLikesCollection, like);
  //     await this.updateNumberOfLikesComment(comment);
  //   }

  //   async unlikeComment(comment: Comment, userID: string): Promise<void> {
  //     const q = query(
  //       this.commentLikesCollection,
  //       where("commentID", "==", comment.id),
  //       where("userID", "==", userID)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     const docRef = querySnapshot.docs[0].ref;

  //     await deleteDoc(docRef);
  //     await this.updateNumberOfLikesComment(comment);
  //   }

  //   async interactWithComment(
  //     comment: Comment,
  //     userID: string,
  //     actionToPreform: string
  //   ): Promise<void> {
  //     if (actionToPreform === "unlike") {
  //       await this.unlikeComment(comment, userID);
  //     } else {
  //       await this.likeComment(comment, userID);
  //     }
  //   }
}

export default LikeService;
