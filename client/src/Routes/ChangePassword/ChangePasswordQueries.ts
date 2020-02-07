import { gql } from "apollo-boost";

export const CHANGE_PASSWORD = gql`
	mutation ChangePassword($password: String, $newPassword: String) {
		UpdateUser(password: $password, newPassword: $newPassword) {
			res
			error
		}
	}
`;
