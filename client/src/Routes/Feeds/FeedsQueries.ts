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
				updateAt
			}
		}
	}
`;
