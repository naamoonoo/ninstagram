import styled from "styled-components";

export const Container = styled.div`
	display: block;
	justify-content: center;
	align-items: center;
	margin: auto;
	max-width: 750px;
	border: 1px solid lightgrey;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

export const Header = styled.div`
	width: 100%;
	height: 45px;
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
`;

export const Time = styled.span`
	color: grey;
	position: absolute;
	right: 15px;
	font-weight: lighter;
	font-size: 14px;
`;

export const Camera = styled.div`
	display: block;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: auto;
	border-top: 1px solid lightgrey;
	border-bottom: 1px solid lightgrey;
	overflow: hidden;
	padding: 20 20;
	position: relative;
`;

export const PreviewDiv = styled.div`
	height: 80px;
	width: 100%;
	display: flexbox;
	margin: 10px 0;
	padding: 5px 2px;
	overflow-x: scroll;
	overflow-y: hidden;
	white-space: nowrap;
`;

export const Preview = styled.img`
	width: auto;
	height: 100%;
	overflow: hidden;
	margin: 0 2px;
	cursor: pointer;
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: 0.3s ease-in-out;
	transition: 0.3s ease-in-out;
	:hover {
		border: 3px solid grey;
		/* -webkit-transform: scale(1.3);
		transform: scale(1.3); */
	}
	:active {
		border: 5px solid red;
		/* -webkit-transform: scale(1.3);
		transform: scale(1.3); */
	}
`;

export const Image = styled.img`
	width: 100%;
	height: auto;
	border-top: 1px solid lightgrey;
	border-bottom: 1px solid lightgrey;
	overflow: hidden;
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
