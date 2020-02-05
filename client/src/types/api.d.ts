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

export interface GetFeeds_GetFeeds_feeds {
	__typename: "Feed";
	id: string;
	photo: string;
	text: string | null;
	user: GetFeeds_GetFeeds_feeds_user | null;
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
