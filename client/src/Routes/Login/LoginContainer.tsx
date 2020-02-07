import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMultiInputs } from "../../utils/hooks";
import LoginPresenter from "./LoginPresenter";
import { Routes } from "../routes";

interface IProps extends RouteComponentProps {}

const LoginContainer: React.FC<IProps> = ({ match }) => {
	console.log(match);
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
	console.log(inputs);

	return (
		<LoginPresenter
			inputs={inputs}
			onChangeHandler={onChangeInput}
			inputLabels={inputLabels}
		/>
	);
};

export default LoginContainer;
