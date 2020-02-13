import React from "react";
import { toast } from "react-toastify";
import Input from "../../Components/Input";
import { ResetPasswordVariables } from "../../types/api";
import { useInput, useMultiInputs, useTitle } from "../../utils/hooks";
import * as S from "./ForgetMyPasswordStyle";

interface IProps {
	keyRequested: boolean;
	isVerified: boolean;
	isEmail: boolean;
	changeMode: any;
	resetPwdMutation: any;
	onVerify: any;
	getKey: any;
}

const ForgetMyPasswordPresenter: React.FC<IProps> = ({
	keyRequested,
	isVerified,
	isEmail,
	changeMode,
	resetPwdMutation,
	onVerify,
	getKey
}) => {
	const [payload, onChangePayload] = useInput("");
	const [key, onChangeKey] = useInput("");
	const label = isEmail ? "Email" : "Phone";
	useTitle("ninstagram | Forget Password");
	const [inputs, onChangeHandle, inputLabels] = useMultiInputs([
		"password",
		"password confirm"
	]);
	const getVerifyKey = (event: React.FormEvent) => {
		event.preventDefault();
		getKey({
			variables: {
				payload,
				type: label.toUpperCase()
			}
		});
	};

	const resetPasswrd = (event: React.FormEvent) => {
		event.preventDefault();
		if (inputs["password"] !== inputs["password confirm"]) {
			return toast.error("Two password you typed is different");
		}
		const variables: ResetPasswordVariables = {
			password: inputs["password"]
		};
		if (isEmail) {
			variables.email = payload;
		} else {
			variables.phone = payload;
		}
		if (isEmail) {
			resetPwdMutation({
				variables
			});
		}
	};

	const renderHeader = () => {
		return !isVerified ? (
			<S.HeaderContainer>
				<S.Header isSelected={isEmail} onClick={() => changeMode(true)}>
					Email
				</S.Header>
				<S.Header
					isSelected={!isEmail}
					onClick={() => changeMode(false)}
				>
					Phone
				</S.Header>
			</S.HeaderContainer>
		) : (
			<S.HeaderContainer>
				<S.Header isSelected={false}>Reset Your password</S.Header>
			</S.HeaderContainer>
		);
	};
	const renderInputs = () => {
		if (!keyRequested) {
			return (
				<S.Form onSubmit={getVerifyKey}>
					<Input
						label={label}
						value={payload}
						onChange={onChangePayload}
						placeholder={`${
							isEmail
								? "password@gmail.com"
								: "+33 __ __ __ __ __"
						}`}
					/>
					<S.Button color="#DB4437" onClick={getVerifyKey}>
						Request
					</S.Button>
				</S.Form>
			);
		} else if (keyRequested && !isVerified) {
			return (
				<S.Form onSubmit={e => onVerify(e, key)}>
					<Input
						label={label}
						value={payload}
						onChange={onChangePayload}
					/>
					<Input
						label="key"
						value={key}
						onChange={onChangeKey}
						placeholder={`put your key`}
					/>
					<S.Button color="#DB4437" onClick={e => onVerify(e, key)}>
						Verify
					</S.Button>
				</S.Form>
			);
		}
		return (
			<S.Form onSubmit={resetPasswrd}>
				{inputLabels.map(label => (
					<Input
						key={label}
						label={label}
						value={inputs[label]}
						onChange={onChangeHandle}
					/>
				))}
				<S.Button color="#DB4437" onClick={resetPasswrd}>
					Reset Password
				</S.Button>
			</S.Form>
		);
	};

	return (
		<S.Container>
			<S.Warning>
				Only verified Phone or Email can be used for find my password
			</S.Warning>
			{renderHeader()}
			<S.Form>{renderInputs()}</S.Form>
			{/* {inputs.key && (
				<S.Button color="#3b5998" onClick={validateMutation}>
					Verify
				</S.Button>
			)}
			<S.Button color="#DB4437" onClick={requestMutation}>
				Request
			</S.Button> */}
		</S.Container>
	);
};

export default ForgetMyPasswordPresenter;
