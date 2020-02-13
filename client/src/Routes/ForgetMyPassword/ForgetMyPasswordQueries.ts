import { gql } from "apollo-boost";

export const FORGET_PWD_REQ_VERFIY_CODE = gql`
	query ForgetPassword($type: String!, $payload: String!) {
		ForgetPassword(type: $type, payload: $payload) {
			res
			error
			key
		}
	}
`;

export const RESET_PASSWORD = gql`
	mutation ResetPassword($email: String, $phone: String, $password: String!) {
		ResetPassword(email: $email, phone: $phone, password: $password) {
			res
			error
			token
		}
	}
`;
