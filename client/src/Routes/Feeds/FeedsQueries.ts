import { gql } from "apollo-boost";

export const GET_FEEDS = gql`
	query GetFeeds($page: Int!) {
		GetFeeds(page: $page) {
			res
			error
			feeds {
				id
				photo
				text
				user {
					id
					firstName
					profilePhoto
				}
				likes {
					userId
				}
				updateAt
			}
		}
	}
`;

export const LIKE_CREATE = gql`
	mutation CreateLike($feedId: String!) {
		CreateLike(feedId: $feedId) {
			res
			error
		}
	}
`;

export const LIKE_DELETE = gql`
	mutation DeleteLike($feedId: String!) {
		DeleteLike(feedId: $feedId) {
			res
			error
		}
	}
`;

export const SUBSCRIBE_FEED = gql`
	subscription SubscribeFeed {
		SubscribeFeed {
			id
		}
	}
`;
