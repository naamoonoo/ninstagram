import { useMutation } from "@apollo/react-hooks";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { USER_LOG_IN } from "../../SharedQueries.local";
import { Routes } from "../routes";
import * as S from "./SocialLoginStyle";

interface IParmas {
	token: string;
}
interface IProps extends RouteComponentProps<IParmas> {}

const SocialLoginPresenter: React.FC<IProps> = ({
	match: {
		params: { token }
	},
	history
}) => {
	const [loginMutation] = useMutation(USER_LOG_IN, {
		variables: { token },
		onCompleted: () => {
			history.push(Routes.HOME);
		}
	});

	useEffect(() => {
		loginMutation();
	}, [loginMutation]);
	return <S.Container>SocialLogin</S.Container>;
};

export default SocialLoginPresenter;
