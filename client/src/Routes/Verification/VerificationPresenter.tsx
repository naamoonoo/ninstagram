import React from "react";
import Input from "../../Components/Input";
import { useTitle } from "../../utils/hooks";
import * as S from "./VerificationStyle";

interface IProps {
	type: string;
	inputs: any;
	onChangeInputs: (event: React.ChangeEvent<HTMLInputElement>) => void;
	params: string[];
	requestMutation: any;
	validateMutation: any;
}

const VerificationPresenter: React.FC<IProps> = ({
	type,
	inputs,
	onChangeInputs,
	params,
	requestMutation,
	validateMutation
}) => {
	useTitle("Ninstgram | Verification");
	const renderInputs = (inputs: any, inputLabels: string[]) => {
		return inputLabels.map(label => (
			<Input
				key={label}
				label={label}
				value={inputs[label]}
				onChange={onChangeInputs}
			/>
		));
	};

	return (
		<S.Container>
			<S.Header>{type.toUpperCase()}</S.Header>
			<S.Form>{renderInputs(inputs, params)}</S.Form>
			{inputs.key && (
				<S.Button color="#3b5998" onClick={validateMutation}>
					Verify
				</S.Button>
			)}
			<S.Button color="#DB4437" onClick={requestMutation}>
				Request
			</S.Button>
		</S.Container>
	);
};

export default VerificationPresenter;
