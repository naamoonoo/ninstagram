import { gql } from "apollo-boost";

export const EMAIL_SIGN_IN = gql`
	mutation EmailSignIn($email: String!, $password: String!) {
		EmailSignIn(email: $email, password: $password) {
			res
			error
			token
		}
	}
`;

export const EMAIL_SIGN_UP = gql`
	mutation EmailSignUp(
		$username: String!
		$email: String!
		$password: String!
	) {
		EmailSignUp(firstName: $username, email: $email, password: $password) {
			res
			error
			token
		}
	}
`;
