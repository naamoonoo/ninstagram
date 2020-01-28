export const typeDefs = ["type Comment {\n  id: String!\n  comment: String\n  user: User\n  likes: [User]\n  comments: [Comment]\n  createAt: String!\n  updateAt: String!\n}\n\ntype GetUserFeedResponse {\n  res: Boolean!\n  error: String\n}\n\ntype Query {\n  GetUserFeed: GetUserFeedResponse!\n}\n\ntype Feed {\n  id: String!\n  photo: String!\n  text: String\n  user: User\n  likes: [User]\n  comments: [Comment]\n  createAt: String!\n  updateAt: String!\n}\n\ntype User {\n  id: String!\n  fbId: String\n  googleId: String\n  password: String!\n  firstName: String!\n  lastName: String!\n  profilePhoto: String!\n  email: Verification\n  phone: Verification\n  feeds: [Feed]\n  likes: [Feed]\n  createAt: String!\n  updateAt: String!\n}\n\ntype SignUpResponse {\n  res: Boolean!\n  error: String\n}\n\ntype Mutation {\n  SignUp: SignUpResponse!\n}\n\ntype Verification {\n  type: String!\n  payload: String!\n  user: User\n  createAt: String!\n  updateAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  GetUserFeed: GetUserFeedResponse;
}

export interface GetUserFeedResponse {
  res: boolean;
  error: string | null;
}

export interface Mutation {
  SignUp: SignUpResponse;
}

export interface SignUpResponse {
  res: boolean;
  error: string | null;
}

export interface Comment {
  id: string;
  comment: string | null;
  user: User | null;
  likes: Array<User> | null;
  comments: Array<Comment> | null;
  createAt: string;
  updateAt: string;
}

export interface User {
  id: string;
  fbId: string | null;
  googleId: string | null;
  password: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  email: Verification | null;
  phone: Verification | null;
  feeds: Array<Feed> | null;
  likes: Array<Feed> | null;
  createAt: string;
  updateAt: string;
}

export interface Verification {
  type: string;
  payload: string;
  user: User | null;
  createAt: string;
  updateAt: string;
}

export interface Feed {
  id: string;
  photo: string;
  text: string | null;
  user: User | null;
  likes: Array<User> | null;
  comments: Array<Comment> | null;
  createAt: string;
  updateAt: string;
}
