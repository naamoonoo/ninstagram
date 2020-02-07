import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_LOG_IN } from "../../SharedQueries.local";
import {
	EmailSignIn,
	EmailSignInVariables,
	EmailSignUp,
	EmailSignUpVariables
} from "../../types/api";
import { forceHistory } from "../../utils/history";
import { useMultiInputs } from "../../utils/hooks";
import { Routes } from "../routes";
import LoginPresenter from "./LoginPresenter";
import { EMAIL_SIGN_IN, EMAIL_SIGN_UP } from "./LoginQueries";

interface IProps extends RouteComponentProps {}

const LoginContainer: React.FC<IProps> = ({ match, history }) => {
	const isLogin = match.path === Routes.LOGIN;
	const LoginInputs = ["email", "password"];
	const SignUpInputs = [
		"username",
		"email",
		"password",
		"password verification"
	];
	const [inputs, onChangeInput, inputLabels] = useMultiInputs(
		isLogin ? LoginInputs : SignUpInputs
	);

	const authHandler = (
		res: boolean,
		error: string | null,
		token: string | null
	) => {
		if (res && token) {
			toast.done("Welcome to ninstagram :)");
			loginMutation({ variables: { token } });
			setTimeout(() => {
				forceHistory.push(Routes.HOME);
			}, 100);
		} else {
			toast.error(error);
		}
	};
	const [loginMutation] = useMutation(USER_LOG_IN);
	const [signInMutation] = useMutation<EmailSignIn, EmailSignInVariables>(
		EMAIL_SIGN_IN,
		{
			onCompleted: ({ EmailSignIn: { res, error, token } }) => {
				authHandler(res, error, token);
			},
			variables: {
				email: inputs["email"],
				password: inputs["password"]
			}
		}
	);

	const [signUpMutation] = useMutation<EmailSignUp, EmailSignUpVariables>(
		EMAIL_SIGN_UP,
		{
			onCompleted: ({ EmailSignUp: { res, error, token } }) => {
				authHandler(res, error, token);
			},
			variables: {
				username: inputs["username"],
				email: inputs["email"],
				password: inputs["password"]
			}
		}
	);

	const onSubmitHandler = () => {
		if (
			(!isLogin && inputs["username"].length === 0) ||
			inputs["email"].length === 0 ||
			inputs["password"].length === 0
		) {
			return toast.error("Please fill the blank");
		}
		if (isLogin) {
			signInMutation();
		} else {
			if (inputs["password"] !== inputs["password verification"]) {
				return toast.error("Password is different");
			}
			signUpMutation();
		}
	};

	return (
		<LoginPresenter
			inputs={inputs}
			onChangeHandler={onChangeInput}
			inputLabels={inputLabels}
			isLogin={isLogin}
			onSubmitHandler={onSubmitHandler}
		/>
	);
};

export default LoginContainer;
