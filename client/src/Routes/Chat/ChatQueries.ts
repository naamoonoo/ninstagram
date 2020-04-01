import { gql } from "apollo-boost";

export const GET_MESSAGES = gql`
	query FetchMessagesByUser($receiverId: String!) {
		FetchMessagesByUser(receiverId: $receiverId) {
			res
			error
			messages {
				sender {
					id
					firstName
					profilePhoto
				}
				receiver {
					id
					firstName
					profilePhoto
				}
				content
				checked
			}
		}
	}
`;

export const SUBSCRIBE_CURRENT_MESSAGES = gql`
	subscription SubscribeCurrentChatMessage($otherId: String!) {
		SubscribeCurrentChatMessage(otherId: $otherId) {
			sender {
				id
				firstName
				profilePhoto
			}
			receiver {
				id
				firstName
				profilePhoto
			}
			content
			checked
		}
	}
`;
