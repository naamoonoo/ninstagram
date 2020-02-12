import React, { useState } from "react";
import * as S from "./InputStyle";

interface IProps {
	label: string;
	value: string;
	onChange: any;
	placeholder?: string;
}

const InputPresenter: React.FC<IProps> = ({
	label,
	value,
	onChange,
	placeholder
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const type = label.search("password") >= 0 ? "password" : "text";
	return (
		<S.Container>
			{label.length > 0 && (
				<S.Label isFocused={isFocused}>{label}</S.Label>
			)}
			<S.Input
				type={type}
				name={label}
				isFocused={isFocused}
				value={value}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</S.Container>
	);
};

export default InputPresenter;
