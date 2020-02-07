import styled from "styled-components";

export const Container = styled.div`
	display: block;
	margin-top: 20px;
`;

interface IFocus {
	isFocused: boolean;
}
export const Label = styled.label<IFocus>`
	display: flex;
	justify-content: right;
	align-items: center;
	width: 100%;
	color: ${props => (props.isFocused ? "lightblue" : "darkgrey")};
	font-weight: lighter;
	margin-right: 10px;
	margin-bottom: 10px;
`;

export const Input = styled.input<IFocus>`
	border: none;
	border-bottom: 1px solid
		${props => (props.isFocused ? "lightblue" : "lightgrey")};
	min-width: 150px;
	min-height: 20px;
	font-size: 1.1em;
	padding-left: 5px;
	color: ${props => (props.isFocused ? "black" : "darkgrey")};
`;
