import React, { useState } from "react";
import ForgetMyPasswordPresenter from "./ForgetMyPasswordPresenter";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
	FORGET_PWD_REQ_VERFIY_CODE,
	RESET_PASSWORD
} from "./ForgetMyPasswordQueries";
import {
	ForgetPassword,
	ForgetPasswordVariables,
	ResetPassword,
	ResetPasswordVariables
} from "../../types/api";
import { toast } from "react-toastify";
import { USER_LOG_IN } from "../../SharedQueries.local";
import { forceHistory } from "../../utils/history";
import { Routes } from "../routes";

const ForgetMyPasswordContainer: React.FC = () => {
	const [keyRequested, setKeyRequsted] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [isEmail, changeMode] = useState(true);

	const [getKey, { data }] = useLazyQuery<
		ForgetPassword,
		ForgetPasswordVariables
	>(FORGET_PWD_REQ_VERFIY_CODE, {
		onCompleted: ({ ForgetPassword: { res, error, key } }) => {
			if (res && key) {
				setKeyRequsted(true);
			} else {
				toast.error(error);
			}
		}
	});

	const [loginWithToken] = useMutation(USER_LOG_IN);
	const [resetPwdMutation] = useMutation<
		ResetPassword,
		ResetPasswordVariables
	>(RESET_PASSWORD, {
		onCompleted: async ({ ResetPassword: { res, error, token } }) => {
			if (res && token) {
				await loginWithToken({ variables: { token } });
				forceHistory.push(Routes.HOME);
			} else {
				toast.error(error);
			}
		}
	});

	const onVerify = (event: React.FormEvent, inputKey: string) => {
		event.preventDefault();
		if (data && data.ForgetPassword && data.ForgetPassword.key) {
			if (inputKey === data.ForgetPassword.key) {
				setIsVerified(true);
			} else {
				toast.error("Invalid Key, please check it again");
			}
		}
	};

	return (
		<ForgetMyPasswordPresenter
			keyRequested={keyRequested}
			isVerified={isVerified}
			isEmail={isEmail}
			getKey={getKey}
			changeMode={changeMode}
			resetPwdMutation={resetPwdMutation}
			onVerify={onVerify}
		/>
	);
};

export default ForgetMyPasswordContainer;
