import { gql } from "apollo-boost";

export const SEARCH_FEEDS = gql`
	query GetTaggedFeeds($tag: String!) {
		GetTaggedFeeds(tag: $tag) {
			res
			error
			feeds {
				photo
				id
			}
		}
	}
`;

export const SEARCH_TAGS = gql`
	query FindHashtagsByTag($search: String!) {
		FindHashtagsByTag(search: $search) {
			res
			error
			tags {
				feeds {
					id
				}
				tag
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
