export const typeDefs = [
	"type CreateCommentResponse {\n  res: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CreateComment(feedId: String!, comment: String!): CreateCommentResponse!\n  DeleteComment(commentId: String!): DeleteCommentResponse!\n  UpdateComment(commentId: String!, comment: String!): UpdateCommentResponse!\n  CreateFeed(photo: String!, text: String!): CreateFeedResponse!\n  DeleteFeed(feedId: String!): DeleteFeedResponse!\n  UpdateFeed(feedId: String!, text: String): UpdateFeedResponse!\n  CreateLike(feedId: String!): CreateLikeResponse!\n  DeleteLike(feedId: String!): DeleteLikeResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String!, password: String!, email: String!): EmailSignUpResponse!\n  UpdateUser(phone: String, email: String, password: String, newPassword: String, profilePhoto: String): UpdateUserResponse!\n  RequestVerification(type: String!, payload: String!): RequestVerificationResponse!\n  ValidateVerification(payload: String!, key: String!): ValidateVerificationResponse!\n}\n\ntype DeleteCommentResponse {\n  res: Boolean!\n  error: String\n}\n\ntype GetCommentsResponse {\n  res: Boolean!\n  error: String\n  comments: [Comment]\n}\n\ntype Query {\n  GetComments(feedId: String!): GetCommentsResponse!\n  GetFeed(feedId: String!): GetFeedResponse!\n  GetFeeds(page: Int!): GetFeedsResponse!\n  GetFeedsByUser(userId: String!): GetFeedsByUserResponse!\n  GetCurrentUser: GetCurrentUserResponse!\n  GetUserById(userId: String!): GetUserByIdResponse!\n}\n\ntype Comment {\n  id: String!\n  comment: String\n  user: User\n  userId: String\n  feed: Feed\n  feedId: String\n  createAt: String!\n  updateAt: String!\n}\n\ntype UpdateCommentResponse {\n  res: Boolean!\n  error: String\n}\n\ntype CreateFeedResponse {\n  res: Boolean!\n  error: String\n}\n\ntype DeleteFeedResponse {\n  res: Boolean!\n  error: String\n}\n\ntype GetFeedResponse {\n  res: Boolean!\n  error: String\n  feed: Feed\n}\n\ntype GetFeedsResponse {\n  res: Boolean!\n  error: String\n  feeds: [Feed]\n}\n\ntype GetFeedsByUserResponse {\n  res: Boolean!\n  error: String\n  feeds: [Feed]\n}\n\ntype Feed {\n  id: String!\n  photo: String!\n  text: String\n  user: User\n  likes: [Like]\n  comments: [Comment]\n  createAt: String!\n  updateAt: String!\n}\n\ntype Subscription {\n  SubscribeFeed: Feed\n}\n\ntype UpdateFeedResponse {\n  res: Boolean!\n  error: String\n}\n\ntype CreateLikeResponse {\n  res: Boolean!\n  error: String\n}\n\ntype DeleteLikeResponse {\n  res: Boolean!\n  error: String\n}\n\ntype Like {\n  id: String!\n  user: User!\n  feed: Feed!\n  feedId: String\n  userId: String\n  createAt: String\n  updateAt: String\n}\n\ntype EmailSignInResponse {\n  res: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  res: Boolean!\n  error: String\n  token: String\n}\n\ntype GetCurrentUserResponse {\n  res: Boolean!\n  error: String\n  user: User\n}\n\ntype GetUserByIdResponse {\n  res: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: String!\n  fbId: String\n  googleId: String\n  firstName: String!\n  lastName: String\n  password: String\n  profilePhoto: String\n  email: String\n  isEmailVerified: Boolean\n  phone: String\n  isPhoneVerified: Boolean\n  feeds: [Feed]\n  likes: [Like]\n  comments: [Comment]\n  createAt: String!\n  updateAt: String!\n}\n\ntype UpdateUserResponse {\n  res: Boolean!\n  error: String\n}\n\ntype RequestVerificationResponse {\n  res: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: String!\n  type: String!\n  payload: String!\n  key: String!\n  isVerified: Boolean!\n  createAt: String!\n  updateAt: String!\n}\n\ntype ValidateVerificationResponse {\n  res: Boolean!\n  error: String\n}\n"
];
/* tslint:disable */

export interface Query {
	GetComments: GetCommentsResponse;
	GetFeed: GetFeedResponse;
	GetFeeds: GetFeedsResponse;
	GetFeedsByUser: GetFeedsByUserResponse;
	GetCurrentUser: GetCurrentUserResponse;
	GetUserById: GetUserByIdResponse;
}

export interface GetCommentsQueryArgs {
	feedId: string;
}

export interface GetFeedQueryArgs {
	feedId: string;
}

export interface GetFeedsQueryArgs {
	page: number;
}

export interface GetFeedsByUserQueryArgs {
	userId: string;
}

export interface GetUserByIdQueryArgs {
	userId: string;
}

export interface GetCommentsResponse {
	res: boolean;
	error: string | null;
	comments: Array<Comment> | null;
}

export interface Comment {
	id: string;
	comment: string | null;
	user: User | null;
	userId: string | null;
	feed: Feed | null;
	feedId: string | null;
	createAt: string;
	updateAt: string;
}

export interface User {
	id: string;
	fbId: string | null;
	googleId: string | null;
	firstName: string;
	lastName: string | null;
	password: string | null;
	profilePhoto: string | null;
	email: string | null;
	isEmailVerified: boolean | null;
	phone: string | null;
	isPhoneVerified: boolean | null;
	feeds: Array<Feed> | null;
	likes: Array<Like> | null;
	comments: Array<Comment> | null;
	createAt: string;
	updateAt: string;
}

export interface Feed {
	id: string;
	photo: string;
	text: string | null;
	user: User | null;
	likes: Array<Like> | null;
	comments: Array<Comment> | null;
	createAt: string;
	updateAt: string;
}

export interface Like {
	id: string;
	user: User;
	feed: Feed;
	feedId: string | null;
	userId: string | null;
	createAt: string | null;
	updateAt: string | null;
}

export interface GetFeedResponse {
	res: boolean;
	error: string | null;
	feed: Feed | null;
}

export interface GetFeedsResponse {
	res: boolean;
	error: string | null;
	feeds: Array<Feed> | null;
}

export interface GetFeedsByUserResponse {
	res: boolean;
	error: string | null;
	feeds: Array<Feed> | null;
}

export interface GetCurrentUserResponse {
	res: boolean;
	error: string | null;
	user: User | null;
}

export interface GetUserByIdResponse {
	res: boolean;
	error: string | null;
	user: User | null;
}

export interface Mutation {
	CreateComment: CreateCommentResponse;
	DeleteComment: DeleteCommentResponse;
	UpdateComment: UpdateCommentResponse;
	CreateFeed: CreateFeedResponse;
	DeleteFeed: DeleteFeedResponse;
	UpdateFeed: UpdateFeedResponse;
	CreateLike: CreateLikeResponse;
	DeleteLike: DeleteLikeResponse;
	EmailSignIn: EmailSignInResponse;
	EmailSignUp: EmailSignUpResponse;
	UpdateUser: UpdateUserResponse;
	RequestVerification: RequestVerificationResponse;
	ValidateVerification: ValidateVerificationResponse;
}

export interface CreateCommentMutationArgs {
	feedId: string;
	comment: string;
}

export interface DeleteCommentMutationArgs {
	commentId: string;
}

export interface UpdateCommentMutationArgs {
	commentId: string;
	comment: string;
}

export interface CreateFeedMutationArgs {
	photo: string;
	text: string;
}

export interface DeleteFeedMutationArgs {
	feedId: string;
}

export interface UpdateFeedMutationArgs {
	feedId: string;
	text: string | null;
}

export interface CreateLikeMutationArgs {
	feedId: string;
}

export interface DeleteLikeMutationArgs {
	feedId: string;
}

export interface EmailSignInMutationArgs {
	email: string;
	password: string;
}

export interface EmailSignUpMutationArgs {
	firstName: string;
	password: string;
	email: string;
}

export interface UpdateUserMutationArgs {
	phone: string | null;
	email: string | null;
	password: string | null;
	newPassword: string | null;
	profilePhoto: string | null;
}

export interface RequestVerificationMutationArgs {
	type: string;
	payload: string;
}

export interface ValidateVerificationMutationArgs {
	payload: string;
	key: string;
}

export interface CreateCommentResponse {
	res: boolean;
	error: string | null;
}

export interface DeleteCommentResponse {
	res: boolean;
	error: string | null;
}

export interface UpdateCommentResponse {
	res: boolean;
	error: string | null;
}

export interface CreateFeedResponse {
	res: boolean;
	error: string | null;
}

export interface DeleteFeedResponse {
	res: boolean;
	error: string | null;
}

export interface UpdateFeedResponse {
	res: boolean;
	error: string | null;
}

export interface CreateLikeResponse {
	res: boolean;
	error: string | null;
}

export interface DeleteLikeResponse {
	res: boolean;
	error: string | null;
}

export interface EmailSignInResponse {
	res: boolean;
	error: string | null;
	token: string | null;
}

export interface EmailSignUpResponse {
	res: boolean;
	error: string | null;
	token: string | null;
}

export interface UpdateUserResponse {
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

export interface Subscription {
	SubscribeFeed: Feed | null;
}

export interface Verification {
	id: string;
	type: string;
	payload: string;
	key: string;
	isVerified: boolean;
	createAt: string;
	updateAt: string;
}
