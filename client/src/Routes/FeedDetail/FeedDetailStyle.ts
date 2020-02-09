import styled from "styled-components";

export const Container = styled.div`
	display: block;
`;

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
	position: relative;
	display: block;
	height: 30px;
	width: 200px;
	color: white;
	margin: 10px 5px;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 3px;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
