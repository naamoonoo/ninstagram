/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_CreateComment {
	__typename: "CreateCommentResponse";
	res: boolean;
	error: string | null;
}

export interface CreateComment {
	CreateComment: CreateComment_CreateComment;
}

export interface CreateCommentVariables {
	feedId: string;
	comment: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteComment
// ====================================================

export interface DeleteComment_DeleteComment {
	__typename: "DeleteCommentResponse";
	res: boolean;
	error: string | null;
}

export interface DeleteComment {
	DeleteComment: DeleteComment_DeleteComment;
}

export interface DeleteCommentVariables {
	commentId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetComments
// ====================================================

export interface GetComments_GetComments_comments_user {
	__typename: "User";
	id: string;
	firstName: string;
	profilePhoto: string | null;
}

export interface GetComments_GetComments_comments {
	__typename: "Comment";
	id: string;
	comment: string | null;
	user: GetComments_GetComments_comments_user | null;
}

export interface GetComments_GetComments {
	__typename: "GetCommentsResponse";
	res: boolean;
	error: string | null;
	comments: (GetComments_GetComments_comments | null)[] | null;
}

export interface GetComments {
	GetComments: GetComments_GetComments;
}

export interface GetCommentsVariables {
	feedId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePassword
// ====================================================

export interface ChangePassword_UpdateUser {
	__typename: "UpdateUserResponse";
	res: boolean;
	error: string | null;
}

export interface ChangePassword {
	UpdateUser: ChangePassword_UpdateUser;
}

export interface ChangePasswordVariables {
	password?: string | null;
	newPassword?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFeed
// ====================================================

export interface GetFeed_GetFeed_feed_user {
	__typename: "User";
	id: string;
	firstName: string;
	profilePhoto: string | null;
}

export interface GetFeed_GetFeed_feed {
	__typename: "Feed";
	id: string;
	photo: string;
	text: string | null;
	user: GetFeed_GetFeed_feed_user | null;
	updateAt: string;
}

export interface GetFeed_GetFeed {
	__typename: "GetFeedResponse";
	res: boolean;
	error: string | null;
	feed: GetFeed_GetFeed_feed | null;
}

export interface GetFeed {
	GetFeed: GetFeed_GetFeed;
}

export interface GetFeedVariables {
	feedId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateFeed
// ====================================================

export interface UpdateFeed_UpdateFeed {
	__typename: "UpdateFeedResponse";
	res: boolean;
	error: string | null;
}

export interface UpdateFeed {
	UpdateFeed: UpdateFeed_UpdateFeed;
}

export interface UpdateFeedVariables {
	feedId: string;
	text?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteFeed
// ====================================================

export interface DeleteFeed_DeleteFeed {
	__typename: "DeleteFeedResponse";
	res: boolean;
	error: string | null;
}

export interface DeleteFeed {
	DeleteFeed: DeleteFeed_DeleteFeed;
}

export interface DeleteFeedVariables {
	feedId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProfilePhoto
// ====================================================

export interface UpdateProfilePhoto_UpdateUser {
	__typename: "UpdateUserResponse";
	res: boolean;
	error: string | null;
}

export interface UpdateProfilePhoto {
	UpdateUser: UpdateProfilePhoto_UpdateUser;
}

export interface UpdateProfilePhotoVariables {
	profilePhoto: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFeeds
// ====================================================

export interface GetFeeds_GetFeeds_feeds_user {
	__typename: "User";
	id: string;
	firstName: string;
	profilePhoto: string | null;
}

export interface GetFeeds_GetFeeds_feeds_likes {
	__typename: "Like";
	userId: string | null;
}

export interface GetFeeds_GetFeeds_feeds {
	__typename: "Feed";
	id: string;
	photo: string;
	text: string | null;
	user: GetFeeds_GetFeeds_feeds_user | null;
	likes: (GetFeeds_GetFeeds_feeds_likes | null)[] | null;
	updateAt: string;
}

export interface GetFeeds_GetFeeds {
	__typename: "GetFeedsResponse";
	res: boolean;
	error: string | null;
	feeds: (GetFeeds_GetFeeds_feeds | null)[] | null;
}

export interface GetFeeds {
	GetFeeds: GetFeeds_GetFeeds;
}

export interface GetFeedsVariables {
	page: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateLike
// ====================================================

export interface CreateLike_CreateLike {
	__typename: "CreateLikeResponse";
	res: boolean;
	error: string | null;
}

export interface CreateLike {
	CreateLike: CreateLike_CreateLike;
}

export interface CreateLikeVariables {
	feedId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteLike
// ====================================================

export interface DeleteLike_DeleteLike {
	__typename: "DeleteLikeResponse";
	res: boolean;
	error: string | null;
}

export interface DeleteLike {
	DeleteLike: DeleteLike_DeleteLike;
}

export interface DeleteLikeVariables {
	feedId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubscribeFeed
// ====================================================

export interface SubscribeFeed_SubscribeFeed {
	__typename: "Feed";
	id: string;
}

export interface SubscribeFeed {
	SubscribeFeed: SubscribeFeed_SubscribeFeed | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EmailSignIn
// ====================================================

export interface EmailSignIn_EmailSignIn {
	__typename: "EmailSignInResponse";
	res: boolean;
	error: string | null;
	token: string | null;
}

export interface EmailSignIn {
	EmailSignIn: EmailSignIn_EmailSignIn;
}

export interface EmailSignInVariables {
	email: string;
	password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EmailSignUp
// ====================================================

export interface EmailSignUp_EmailSignUp {
	__typename: "EmailSignUpResponse";
	res: boolean;
	error: string | null;
	token: string | null;
}

export interface EmailSignUp {
	EmailSignUp: EmailSignUp_EmailSignUp;
}

export interface EmailSignUpVariables {
	username: string;
	email: string;
	password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrentUserNewFeed
// ====================================================

export interface GetCurrentUserNewFeed_GetCurrentUser_user {
	__typename: "User";
	firstName: string;
	profilePhoto: string | null;
}

export interface GetCurrentUserNewFeed_GetCurrentUser {
	__typename: "GetCurrentUserResponse";
	user: GetCurrentUserNewFeed_GetCurrentUser_user | null;
}

export interface GetCurrentUserNewFeed {
	GetCurrentUser: GetCurrentUserNewFeed_GetCurrentUser;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateFeed
// ====================================================

export interface CreateFeed_CreateFeed {
	__typename: "CreateFeedResponse";
	res: boolean;
	error: string | null;
}

export interface CreateFeed {
	CreateFeed: CreateFeed_CreateFeed;
}

export interface CreateFeedVariables {
	photo: string;
	text: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserById
// ====================================================

export interface GetUserById_GetUserById_user_feeds {
	__typename: "Feed";
	id: string;
	photo: string;
}

export interface GetUserById_GetUserById_user {
	__typename: "User";
	firstName: string;
	profilePhoto: string | null;
	feeds: (GetUserById_GetUserById_user_feeds | null)[] | null;
	isEmailVerified: boolean | null;
	isPhoneVerified: boolean | null;
	email: string | null;
	phone: string | null;
}

export interface GetUserById_GetUserById {
	__typename: "GetUserByIdResponse";
	res: boolean;
	error: string | null;
	user: GetUserById_GetUserById_user | null;
}

export interface GetUserById {
	GetUserById: GetUserById_GetUserById;
}

export interface GetUserByIdVariables {
	userId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RequestVerification
// ====================================================

export interface RequestVerification_RequestVerification {
	__typename: "RequestVerificationResponse";
	res: boolean;
	error: string | null;
}

export interface RequestVerification {
	RequestVerification: RequestVerification_RequestVerification;
}

export interface RequestVerificationVariables {
	type: string;
	payload: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ValidateVerification
// ====================================================

export interface ValidateVerification_ValidateVerification {
	__typename: "ValidateVerificationResponse";
	res: boolean;
	error: string | null;
}

export interface ValidateVerification {
	ValidateVerification: ValidateVerification_ValidateVerification;
}

export interface ValidateVerificationVariables {
	payload: string;
	key: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrentUser
// ====================================================

export interface GetCurrentUser_GetCurrentUser_user_likes {
	__typename: "Like";
	feedId: string | null;
}

export interface GetCurrentUser_GetCurrentUser_user {
	__typename: "User";
	id: string;
	firstName: string;
	profilePhoto: string | null;
	likes: (GetCurrentUser_GetCurrentUser_user_likes | null)[] | null;
	email: string | null;
	phone: string | null;
}

export interface GetCurrentUser_GetCurrentUser {
	__typename: "GetCurrentUserResponse";
	res: boolean;
	user: GetCurrentUser_GetCurrentUser_user | null;
}

export interface GetCurrentUser {
	GetCurrentUser: GetCurrentUser_GetCurrentUser;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
