import { gql } from "apollo-boost";

export const GET_FEED = gql`
	query GetFeed($feedId: String!) {
		GetFeed(feedId: $feedId) {
			res
			error
			feed {
				id
				photo
				text
				user {
					id
					firstName
					profilePhoto
				}
				updateAt
			}
		}
	}
`;

export const UPDATE_FEED = gql`
	mutation UpdateFeed($feedId: String!, $text: String) {
		UpdateFeed(feedId: $feedId, text: $text) {
			res
			error
		}
	}
`;
export const DELETE_FEED = gql`
	mutation DeleteFeed($feedId: String!) {
		DeleteFeed(feedId: $feedId) {
			res
			error
		}
	}
`;

export const UPDATE_PROFILE_PHOTO = gql`
	mutation UpdateProfilePhoto($profilePhoto: String!) {
		UpdateUser(profilePhoto: $profilePhoto) {
			res
			error
		}
	}
`;
