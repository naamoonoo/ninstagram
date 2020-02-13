import styled from "styled-components";

export const Container = styled.div`
	position: fixed;
	top: 0%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px lightgrey solid;
	height: 60px;
	width: 100%;
	background-color: white;
	-webkit-box-shadow: 0 8px 10px -6px black;
	-moz-box-shadow: 0 8px 10px -6px black;
	box-shadow: 0 8px 10px -6px black;
	z-index: 2;
`;

export const Title = styled.div`
	font-size: 22px;
	background: radial-gradient(
		circle at 30% 107%,
		#fdf497 0%,
		#fdf497 5%,
		#fd5949 45%,
		#d6249f 60%,
		#285aeb 90%
	);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font-weight: 200;
	cursor: pointer;
`;

export const Back = styled.div`
	height: 50%;
	position: absolute;
	left: 10px;
	cursor: pointer;
`;

export const Menu = styled.div`
	height: 50%;
	width: auto;
	position: absolute;
	right: 10px;
	cursor: pointer;
`;
