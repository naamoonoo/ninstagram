import React from "react";
import Input from "../../Components/Input";
import { forceHistory } from "../../utils/history";
import { Routes } from "../routes";
import * as S from "./LoginStyle";

interface IProps {
	inputs: any;
	inputLabels: string[];
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginPresenter: React.FC<IProps> = ({
	inputs,
	onChangeHandler,
	inputLabels
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

	return (
		<S.Container>
			<S.Header>LOGIN</S.Header>
			<S.Form>{renderInputs(inputs, inputLabels)}</S.Form>
			<S.Button color="darkgrey">Login</S.Button>
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
			<S.LinkExtend to={Routes.SIGN_UP}>or go to sign up</S.LinkExtend>
		</S.Container>
	);
};

export default LoginPresenter;
