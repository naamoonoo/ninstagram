import React from "react";
import Input from "../../Components/Input";
import { forceHistory } from "../../utils/history";
import { useTitle } from "../../utils/hooks";
import { Routes } from "../routes";
import * as S from "./ChangePasswordStyle";

interface IProps {
	inputs: any;
	inputLabels: string[];
	onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmitHandler: () => void;
}

const ChangePasswordPresenter: React.FC<IProps> = ({
	inputs,
	onChangeInput,
	inputLabels,
	onSubmitHandler
}) => {
	useTitle("Ninstagram | Password Change");
	const renderInputs = (inputs: any, inputLabels: string[]) => {
		return inputLabels.map(label => (
			<Input
				key={label}
				label={label}
				value={inputs[label]}
				onChange={onChangeInput}
			/>
		));
	};

	return (
		<S.Container>
			<S.Header>CHANGE PASSWORD</S.Header>
			<S.Form onSubmit={onSubmitHandler}>
				{renderInputs(inputs, inputLabels)}
			</S.Form>
			<S.Button color="#3b5998" onClick={onSubmitHandler}>
				UPDATE
			</S.Button>
		</S.Container>
	);
};

export default ChangePasswordPresenter;
