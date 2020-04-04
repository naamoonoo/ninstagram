import styled from "styled-components";

export const Form = styled.form`
	background: black;
	border: 1px lightgrey solid;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	max-width: 650px;
	margin: auto;
	padding: 5 20;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Input = styled.input`
	width: 100%;
	height: 100%;
	font-size: 16px;
	padding-left: 20px;
	/* position: fixed;
	bottom: 0;
	margin: auto; */
`;
export const Button = styled.button`
	right: 0;
	height: 100%;
	position: absolute;
	fill: gray;

	:hover {
		fill: black;
	}
`;
