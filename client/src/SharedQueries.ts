import { gql } from "apollo-boost";

export const GET_CURRENT_USER = gql`
	query GetCurrentUser {
		GetCurrentUser {
			res
			user {
				id
				firstName
				profilePhoto
				likes {
					feedId
				}
				email
				phone
			}
		}
	}
`;
