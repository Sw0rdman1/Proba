import {
  getFirestore,
  collection,
  getDocs,
  query,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { User } from "./AuthService";
import LikeService from "./LikeService";
import BookmarkService from "./BookmarkService";
import UserService from "./UserSevice";

export interface Post {
  id: string;
  content: string;
  contentPhoto: string;
  author: User;
  createdAt: Date;
  numberOfLikes: number;
  numberOfComments: number;
  numberOfBookmarks: number;
  liked: boolean;
  bookmarked: boolean;
  newPost?: boolean;
}

class PostService {
  private db = getFirestore();
  private postsCollection = collection(this.db, "posts");
  private userService = new UserService();
  private likeService = new LikeService();
  private bookmarkService = new BookmarkService();

  async getPosts(currentUserID: string): Promise<Post[]> {
    const querySnapshot = await getDocs(this.postsCollection);
    const posts = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();

        const post: Post = {
          id: doc.id,
          content: data.content,
          contentPhoto: data.contentPhoto,
          createdAt: data.createdAt.toDate(),
          numberOfLikes: data.numberOfLikes,
          numberOfComments: data.numberOfComments,
          numberOfBookmarks: data.numberOfBookmarks,
          liked: await this.likeService.isPostLiked(doc.id, currentUserID),
          author: await this.userService.getUserByID(data.authorID),
          bookmarked: await this.bookmarkService.isPostBookmarked(
            doc.id,
            currentUserID
          ),
        };
        return post;
      })
    );
    return posts;
  }

  async getPostByID(postID: string, author: User): Promise<Post> {
    const docRef = doc(this.db, "posts", postID);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    const post: Post = {
      id: docSnap.id,
      content: data?.content,
      contentPhoto: data?.contentPhoto,
      author: author,
      createdAt: data?.createdAt.toDate(),
      numberOfLikes: 0,
      numberOfComments: 0,
      numberOfBookmarks: 0,
      liked: false,
      bookmarked: false,
    };
    return post;
  }

  async getPostData(post: Post, currentUserID: string): Promise<Post> {
    return {
      ...post,
      liked: await this.likeService.isPostLiked(post.id, currentUserID),
      author: await this.userService.getUserByID(post.author.uid),
      bookmarked: await this.bookmarkService.isPostBookmarked(
        post.id,
        currentUserID
      ),
    };
  }

  async getPostsByUserCreator(user: User): Promise<Post[]> {
    const querySnapshot = await getDocs(
      query(this.postsCollection, where("authorID", "==", user.uid))
    );
    const posts = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const post: Post = {
          id: doc.id,
          content: data.content,
          contentPhoto: data.contentPhoto,
          author: user,
          createdAt: data?.createdAt.toDate(),
          numberOfLikes: 0,
          numberOfComments: 0,
          numberOfBookmarks: 0,
          liked: false,
          bookmarked: false,
        };
        return post;
      })
    );
    return posts;
  }

  // async generateRandomPost(): Promise<Post> {
  //   const post = {
  //     authorID: "EVni79jimWfDnXO4LnUTsB3WhRK2",
  //     content: faker.lorem.sentence(),
  //     contentPhoto: faker.image.urlPicsumPhotos(),
  //     createdAt: faker.date.recent(),
  //     numberOfLikes: 0,
  //     numberOfComments: 0,
  //     numberOfBookmarks: 0,
  //   };

  //   const docRef = await addDoc(this.postsCollection, post);
  //   const author = await this.userService.getUserByID(post.authorID);
  //   return this.getPostByID(docRef.id, author);
  // }
}

export default PostService;
