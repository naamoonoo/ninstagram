import { gql } from "apollo-boost";

export const VERIFY_REQUEST = gql`
	mutation RequestVerification($type: String!, $payload: String!) {
		RequestVerification(type: $type, payload: $payload) {
			res
			error
		}
	}
`;

export const VALIDATE_VERIFICATION = gql`
	mutation ValidateVerification($payload: String!, $key: String!) {
		ValidateVerification(payload: $payload, key: $key) {
			res
			error
		}
	}
`;
