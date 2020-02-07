import React from "react";
import { useMultiInputs } from "../../utils/hooks";
import LoginPresenter from "./LoginPresenter";

const LoginContainer: React.FC = () => {
	const [inputs, onChangeInput, inputLabels] = useMultiInputs([
		"email",
		"password"
	]);

	return (
		<LoginPresenter
			inputs={inputs}
			onChangeHandler={onChangeInput}
			inputLabels={inputLabels}
		/>
	);
};

export default LoginContainer;
