import { gql } from "apollo-boost";

export const SEND_MESSAGE = gql`
	mutation CreateMessage(
		$receiverId: String!
		$content: String!
		$chatId: String
	) {
		CreateMessage(
			receiverId: $receiverId
			content: $content
			chatId: $chatId
		) {
			res
			error
		}
	}
`;
