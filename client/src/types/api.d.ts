/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateMessage
// ====================================================

export interface CreateMessage_CreateMessage {
  __typename: "CreateMessageResponse";
  res: boolean;
  error: string | null;
}

export interface CreateMessage {
  CreateMessage: CreateMessage_CreateMessage;
}

export interface CreateMessageVariables {
  receiverId: string;
  content: string;
  chatId?: string | null;
}

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
  profilePhoto: string;
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
// GraphQL query operation: FetchMessagesByUser
// ====================================================

export interface FetchMessagesByUser_FetchMessagesByUser_messages_sender {
  __typename: "User";
  id: string;
  firstName: string;
  profilePhoto: string;
}

export interface FetchMessagesByUser_FetchMessagesByUser_messages_receiver {
  __typename: "User";
  id: string;
  firstName: string;
  profilePhoto: string;
}

export interface FetchMessagesByUser_FetchMessagesByUser_messages {
  __typename: "Message";
  id: string;
  sender: FetchMessagesByUser_FetchMessagesByUser_messages_sender;
  receiver: FetchMessagesByUser_FetchMessagesByUser_messages_receiver;
  chatId: string | null;
  content: string;
  checked: boolean | null;
}

export interface FetchMessagesByUser_FetchMessagesByUser {
  __typename: "FetchMessagesByUserResponse";
  res: boolean;
  error: string | null;
  messages: (FetchMessagesByUser_FetchMessagesByUser_messages | null)[] | null;
}

export interface FetchMessagesByUser {
  FetchMessagesByUser: FetchMessagesByUser_FetchMessagesByUser;
}

export interface FetchMessagesByUserVariables {
  receiverId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubscribeCurrentChatMessage
// ====================================================

export interface SubscribeCurrentChatMessage_SubscribeCurrentChatMessage {
  __typename: "Message";
  chatId: string | null;
}

export interface SubscribeCurrentChatMessage {
  SubscribeCurrentChatMessage: SubscribeCurrentChatMessage_SubscribeCurrentChatMessage | null;
}

export interface SubscribeCurrentChatMessageVariables {
  otherId: string;
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
  profilePhoto: string;
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
  profilePhoto: string;
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
// GraphQL subscription operation: SubscribeMessage
// ====================================================

export interface SubscribeMessage_SubscribeMessage_sender {
  __typename: "User";
  id: string;
  firstName: string;
  profilePhoto: string;
}

export interface SubscribeMessage_SubscribeMessage_receiver {
  __typename: "User";
  id: string;
  firstName: string;
  profilePhoto: string;
}

export interface SubscribeMessage_SubscribeMessage {
  __typename: "Message";
  id: string;
  sender: SubscribeMessage_SubscribeMessage_sender;
  receiver: SubscribeMessage_SubscribeMessage_receiver;
  chatId: string | null;
  content: string;
  checked: boolean | null;
}

export interface SubscribeMessage {
  SubscribeMessage: SubscribeMessage_SubscribeMessage | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ForgetPassword
// ====================================================

export interface ForgetPassword_ForgetPassword {
  __typename: "ForgetPasswordResponse";
  res: boolean;
  error: string | null;
  key: string | null;
}

export interface ForgetPassword {
  ForgetPassword: ForgetPassword_ForgetPassword;
}

export interface ForgetPasswordVariables {
  type: string;
  payload: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_ResetPassword {
  __typename: "ResetPasswordResponse";
  res: boolean;
  error: string | null;
  token: string | null;
}

export interface ResetPassword {
  ResetPassword: ResetPassword_ResetPassword;
}

export interface ResetPasswordVariables {
  email?: string | null;
  phone?: string | null;
  password: string;
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
  profilePhoto: string;
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
// GraphQL query operation: GetTaggedFeeds
// ====================================================

export interface GetTaggedFeeds_GetTaggedFeeds_feeds {
  __typename: "Feed";
  photo: string;
  id: string;
}

export interface GetTaggedFeeds_GetTaggedFeeds {
  __typename: "GetTaggedFeedsResponse";
  res: boolean;
  error: string | null;
  feeds: (GetTaggedFeeds_GetTaggedFeeds_feeds | null)[] | null;
}

export interface GetTaggedFeeds {
  GetTaggedFeeds: GetTaggedFeeds_GetTaggedFeeds;
}

export interface GetTaggedFeedsVariables {
  tag: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindHashtagsByTag
// ====================================================

export interface FindHashtagsByTag_FindHashtagsByTag_tags_feeds {
  __typename: "Feed";
  id: string;
}

export interface FindHashtagsByTag_FindHashtagsByTag_tags {
  __typename: "Hashtag";
  feeds: (FindHashtagsByTag_FindHashtagsByTag_tags_feeds | null)[] | null;
  tag: string;
}

export interface FindHashtagsByTag_FindHashtagsByTag {
  __typename: "FindHashtagsByTagResponse";
  res: boolean;
  error: string | null;
  tags: (FindHashtagsByTag_FindHashtagsByTag_tags | null)[] | null;
}

export interface FindHashtagsByTag {
  FindHashtagsByTag: FindHashtagsByTag_FindHashtagsByTag;
}

export interface FindHashtagsByTagVariables {
  search: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindUserByUsername
// ====================================================

export interface FindUserByUsername_FindUserByUsername_users {
  __typename: "User";
  firstName: string;
  profilePhoto: string;
  id: string;
}

export interface FindUserByUsername_FindUserByUsername {
  __typename: "FindUserByUsernameResponse";
  res: boolean;
  error: string | null;
  users: (FindUserByUsername_FindUserByUsername_users | null)[] | null;
}

export interface FindUserByUsername {
  FindUserByUsername: FindUserByUsername_FindUserByUsername;
}

export interface FindUserByUsernameVariables {
  search: string;
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
  id: string;
  firstName: string;
  profilePhoto: string;
  feeds: (GetUserById_GetUserById_user_feeds | null)[] | null;
  isEmailVerified: boolean | null;
  isPhoneVerified: boolean | null;
  email: string | null;
  phone: string | null;
  fbId: string | null;
  googleId: string | null;
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
  profilePhoto: string;
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
