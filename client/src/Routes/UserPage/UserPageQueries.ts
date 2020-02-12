import { gql } from "apollo-boost";

export const GET_USER_BY_ID = gql`
	query GetUserById($userId: String!) {
		GetUserById(userId: $userId) {
			res
			error
			user {
				firstName
				profilePhoto
				feeds {
					id
					photo
				}
				isEmailVerified
				isPhoneVerified
				email
				phone
				fbId
				googleId
			}
		}
	}
`;
