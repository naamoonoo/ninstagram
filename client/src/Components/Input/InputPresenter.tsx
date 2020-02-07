import React, { useState } from "react";
import { IInputs } from "../../types/types";
import * as S from "./InputStyle";

interface IProps {
	label: string;
	value: string;
	onChange: any;
}

const InputPresenter: React.FC<IProps> = ({ label, value, onChange }) => {
	const [isFocused, setIsFocused] = useState(false);
	const type = label.search("password") >= 0 ? "password" : "text";
	return (
		<S.Container>
			<S.Label isFocused={isFocused}>{label}</S.Label>
			<S.Input
				type={type}
				name={label}
				isFocused={isFocused}
				value={value}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onChange={onChange}
			/>
		</S.Container>
	);
};

export default InputPresenter;
