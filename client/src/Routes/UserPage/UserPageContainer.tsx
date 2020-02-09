import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GET_CURRENT_USER } from "../../SharedQueries";
import { USER_LOG_OUT } from "../../SharedQueries.local";
import UserPagePresenter from "./UserPagePresenter";
import { GET_USER_BY_ID } from "./UserPageQueries";

interface IParams {
	userId: string;
}

interface IProps extends RouteComponentProps<IParams> {}

const UserPageContainer: React.FC<IProps> = ({
	match: { params: { userId = null } = {} } = {},
	history
}) => {
	const isCurrentUser = userId ? false : true;
	const [getUserByIdQuery, { data: userData }] = useLazyQuery(GET_USER_BY_ID);
	useQuery(GET_CURRENT_USER, {
		onCompleted: ({
			GetCurrentUser: {
				user: { id }
			}
		}) => {
			getUserByIdQuery({
				variables: {
					userId: userId || id
				}
			});
		}
	});
	const [logOutMutation] = useMutation(USER_LOG_OUT);

	return (
		<UserPagePresenter
			userData={userData}
			history={history}
			isCurrentUser={isCurrentUser}
			logOutMutation={logOutMutation}
		/>
	);
};

export default UserPageContainer;
