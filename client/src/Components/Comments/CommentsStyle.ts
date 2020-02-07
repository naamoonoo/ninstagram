import styled from "styled-components";

export const Container = styled.div`
	display: block;
	/* align-items: center; */
	/* justify-content: center; */
`;

export const CommentContainer = styled.div`
	display: flex;
	align-items: center;
	min-height: 10px;
	margin: 10px 2px;
	position: relative;
`;

export const Text = styled.span`
	float: left;
	margin-left: 10px;
	font-size: 0.95em;
	overflow: hidden;
`;

export const Input = styled.input`
	margin-left: 10px;
	border: none;
	width: 80%;
	font-size: 1em;
	border-bottom: 1px solid lightgrey;
	& :focus {
		border-bottom: 1px solid blue;
	}
`;

export const Form = styled.form`
	width: 100%;
`;

export const DeleteButton = styled.div`
	cursor: pointer;
	position: absolute;
	right: 5px;
	fill: darkred;
	opacity: 0.3;
	transform: all 1s linear;
	border-radius: 50%;
	overflow: hidden;
	& :hover {
		opacity: 1;
		border-radius: 50%;
		background-color: lightgrey;
	}
`;
