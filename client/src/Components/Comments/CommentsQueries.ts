import { gql } from "apollo-boost";

export const CREATE_COMMENTS = gql`
	mutation CreateComment($feedId: String!, $comment: String!) {
		CreateComment(feedId: $feedId, comment: $comment) {
			res
			error
		}
	}
`;

export const DELETE_COMMENTS = gql`
	mutation DeleteComment($commentId: String!) {
		DeleteComment(commentId: $commentId) {
			res
			error
		}
	}
`;

export const GET_COMMENTS = gql`
	query GetComments($feedId: String!) {
		GetComments(feedId: $feedId) {
			res
			error
			comments {
				id
				comment
				user {
					id
					firstName
					profilePhoto
				}
			}
		}
	}
`;
