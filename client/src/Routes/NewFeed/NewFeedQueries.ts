import { gql } from "apollo-boost";

export const GET_CURRENT_USER_NEW_FEED = gql`
	query GetCurrentUserNewFeed {
		GetCurrentUser {
			user {
				firstName
				profilePhoto
			}
		}
	}
`;

export const CREATE_FEED = gql`
	mutation CreateFeed($photo: String!, $text: String!) {
		CreateFeed(photo: $photo, text: $text) {
			res
			error
		}
	}
`;
