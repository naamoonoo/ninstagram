import { gql } from "apollo-boost";

export const SEARCH_FEEDS = gql`
	query FindFeedsByHashtag($search: String!) {
		FindFeedsByHashtag(search: $search) {
			res
			error
			feeds {
				photo
				id
			}
		}
	}
`;

export const SEARCH_USERS = gql`
	query FindUserByUsername($search: String!) {
		FindUserByUsername(search: $search) {
			res
			error
			users {
				firstName
				profilePhoto
				id
			}
		}
	}
`;
