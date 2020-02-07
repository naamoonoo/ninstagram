import styled from "styled-components";

export const Container = styled.div``;

export const TextInput = styled.input`
	width: 100%;
	min-height: 100px;
	font-size: 1.1em;
	border: none;
	padding: 10px 20px;
	white-space: pre-wrap;
	&:focus {
		border-bottom: 1px solid lightsteelblue;
	}
`;

export const Button = styled.button`
	display: block;
	height: 30px;
	width: 200px;
	color: white;
	background-color: darkred;
	margin: 10px auto 0 auto;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 3px;
`;
