import { gql } from "apollo-boost";

export const GET_CURRENT_USER = gql`
	query GetCurrentUser {
		GetCurrentUser {
			user {
				id
				firstName
				profilePhoto
				likes {
					feedId
				}
				# feeds{

				# }
			}
		}
	}
`;
