export const typeDefs = ["type Comment {\n  id: String!\n  comment: String\n  user: User\n  feed: Feed\n  createAt: String!\n  updateAt: String!\n}\n\ntype GetUserFeedResponse {\n  res: Boolean!\n  error: String\n}\n\ntype Query {\n  GetUserFeed: GetUserFeedResponse!\n}\n\ntype Feed {\n  id: String!\n  photo: String!\n  text: String\n  user: User\n  likes: [User]\n  comments: [Comment]\n  createAt: String!\n  updateAt: String!\n}\n\ntype User {\n  id: String!\n  fbId: String\n  googleId: String\n  firstName: String!\n  lastName: String!\n  password: String!\n  profilePhoto: String!\n  email: Verification\n  phone: Verification\n  feeds: [Feed]\n  likes: [Feed]\n  comments: [Comment]\n  createAt: String!\n  updateAt: String!\n}\n\ntype SignUpResponse {\n  res: Boolean!\n  error: String\n}\n\ntype Mutation {\n  SignUp: SignUpResponse!\n  RequestVerification(type: String!, payload: String!): RequestVerificationResponse!\n  ValidateVerification(payload: String!, key: String!): ValidateVerificationResponse!\n}\n\ntype RequestVerificationResponse {\n  res: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: String!\n  type: String!\n  payload: String!\n  key: String!\n  user: User\n  isVerified: Boolean!\n  createAt: String!\n  updateAt: String!\n}\n\ntype ValidateVerificationResponse {\n  res: Boolean!\n  error: String\n}\n"];
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
  RequestVerification: RequestVerificationResponse;
  ValidateVerification: ValidateVerificationResponse;
}

export interface RequestVerificationMutationArgs {
  type: string;
  payload: string;
}

export interface ValidateVerificationMutationArgs {
  payload: string;
  key: string;
}

export interface SignUpResponse {
  res: boolean;
  error: string | null;
}

export interface RequestVerificationResponse {
  res: boolean;
  error: string | null;
}

export interface ValidateVerificationResponse {
  res: boolean;
  error: string | null;
}

export interface Comment {
  id: string;
  comment: string | null;
  user: User | null;
  feed: Feed | null;
  createAt: string;
  updateAt: string;
}

export interface User {
  id: string;
  fbId: string | null;
  googleId: string | null;
  firstName: string;
  lastName: string;
  password: string;
  profilePhoto: string;
  email: Verification | null;
  phone: Verification | null;
  feeds: Array<Feed> | null;
  likes: Array<Feed> | null;
  comments: Array<Comment> | null;
  createAt: string;
  updateAt: string;
}

export interface Verification {
  id: string;
  type: string;
  payload: string;
  key: string;
  user: User | null;
  isVerified: boolean;
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
