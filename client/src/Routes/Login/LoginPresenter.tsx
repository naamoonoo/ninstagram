import React from "react";
import Input from "../../Components/Input";
import { forceHistory } from "../../utils/history";
import { Routes } from "../routes";
import * as S from "./LoginStyle";

interface IProps {
	inputs: any;
	inputLabels: string[];
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isLogin: boolean;
	onSubmitHandler: any;
}

const LoginPresenter: React.FC<IProps> = ({
	inputs,
	onChangeHandler,
	inputLabels,
	isLogin,
	onSubmitHandler
}) => {
	const renderInputs = (inputs: any, inputLabels: string[]) => {
		return inputLabels.map(label => (
			<Input
				key={label}
				label={label}
				value={inputs[label]}
				onChange={onChangeHandler}
			/>
		));
	};

	const head = isLogin ? "LOGIN" : "SIGN UP";
	const text = isLogin ? "sign up" : "login";
	const routes = isLogin ? Routes.SIGN_UP : Routes.LOGIN;
	return (
		<S.Container>
			<S.Header>{head}</S.Header>
			<S.Form onSubmit={onSubmitHandler}>
				{renderInputs(inputs, inputLabels)}
			</S.Form>
			<S.Button color="darkgrey" onClick={onSubmitHandler}>
				{head}
			</S.Button>
			<S.Button
				color="#DB4437"
				onClick={() => forceHistory.push("/api/auth/google")}
			>
				Google
			</S.Button>
			<S.Button
				color="#3b5998"
				onClick={() => forceHistory.push("/api/auth/facebook")}
			>
				facebook
			</S.Button>
			<S.LinkExtend to={routes}>go to {text}</S.LinkExtend>
			<S.LinkExtend to={routes}>find my password</S.LinkExtend>
		</S.Container>
	);
};

export default LoginPresenter;
