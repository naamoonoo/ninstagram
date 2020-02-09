import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { toast } from "react-toastify";
import { ChangePassword, ChangePasswordVariables } from "../../types/api";
import { forceHistory } from "../../utils/history";
import { useMultiInputs } from "../../utils/hooks";
import { Routes } from "../routes";
import ChangePasswordPresenter from "./ChangePasswordPresenter";
import { CHANGE_PASSWORD } from "./ChangePasswordQueries";

const ChangePasswordContainer: React.FC = () => {
	const [inputs, onChangeInput, inputLabels] = useMultiInputs([
		"password",
		"new password",
		"password confrim"
	]);

	const [changePasswordMutation] = useMutation<
		ChangePassword,
		ChangePasswordVariables
	>(CHANGE_PASSWORD, {
		variables: {
			password: inputs["password"],
			newPassword: inputs["new password"]
		},
		onCompleted: ({ UpdateUser: { res, error } }) => {
			if (res) {
				forceHistory.push(Routes.USER_PAGE);
			} else {
				toast.error(error);
			}
		}
	});

	const onSubmitHandler = () => {
		const res = Object.keys(inputs).reduce(
			(acc, key) => (acc += inputs[key].length > 0 ? 1 : -1),
			0
		);
		if (res !== 3) {
			return toast.error("Please fill in the blanks");
		}
		if (inputs["new password"] !== inputs["password confrim"]) {
			return toast.error(
				"New Password doesn't match, please check again"
			);
		}
		changePasswordMutation();
	};
	return (
		<ChangePasswordPresenter
			inputs={inputs}
			onChangeInput={onChangeInput}
			inputLabels={inputLabels}
			onSubmitHandler={onSubmitHandler}
		/>
	);
};

export default ChangePasswordContainer;
