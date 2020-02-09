import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_CURRENT_USER } from "../../SharedQueries";
import {
	GetCurrentUser,
	RequestVerification,
	RequestVerificationVariables,
	ValidateVerification,
	ValidateVerificationVariables
} from "../../types/api";
import { forceHistory } from "../../utils/history";
import { useMultiInputs } from "../../utils/hooks";
import { Routes } from "../routes";
import VerificationPresenter from "./VerificationPresenter";
import { VALIDATE_VERIFICATION, VERIFY_REQUEST } from "./VerificationQueries";

interface IProps extends RouteComponentProps<{ type: string; key: string }> {}

const VerificationContainer: React.FC<IProps> = ({
	match: {
		params: { type, key }
	}
}) => {
	const [inputs, onChangeInputs, params, setInputs] = useMultiInputs([
		type,
		"key"
	]);
	useQuery<GetCurrentUser>(GET_CURRENT_USER, {
		onCompleted: ({ GetCurrentUser: { res, user } }) => {
			if (res && user) {
				const value = type === "email" ? user.email : user.phone;
				setInputs({
					...inputs,
					[type]: value || "",
					key: key === "no" ? "" : key
				});
			}
		}
	});

	const [requestMutation] = useMutation<
		RequestVerification,
		RequestVerificationVariables
	>(VERIFY_REQUEST, {
		variables: {
			type: type.toUpperCase(),
			payload: inputs[type]
		},
		onCompleted: ({ RequestVerification: { res, error } }) => {
			if (res) {
				toast.done(`Check your ${type}`);
			} else {
				toast.error(error);
			}
		}
	});

	const [validateMutation] = useMutation<
		ValidateVerification,
		ValidateVerificationVariables
	>(VALIDATE_VERIFICATION, {
		variables: {
			payload: inputs[type],
			key: inputs.key
		},
		onCompleted: ({ ValidateVerification: { res, error } }) => {
			handleOnComplete(res, error);
		}
	});

	const handleOnComplete = (res: boolean, error: string | null) => {
		if (res) {
			forceHistory.push(Routes.USER_PAGE);
		} else {
			toast.error(error);
		}
	};

	return (
		<VerificationPresenter
			type={type}
			inputs={inputs}
			onChangeInputs={onChangeInputs}
			params={params}
			requestMutation={requestMutation}
			validateMutation={validateMutation}
		/>
	);
};

export default VerificationContainer;
