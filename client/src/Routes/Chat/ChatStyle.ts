import styled from "styled-components";

export const Container = styled.div`
	display: block;
	max-width: 650px;
	height: 100%;
	/* justify-content: center;
	align-items: center; */
	margin: auto;
	border: 1px lightgray solid;
`;

export const Header = styled.div`
	border-bottom: 1px lightgray solid;
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.div`
	/* width: 100%; */
	height: 100%;
	overflow: scroll;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const Input = styled.div`
	width: 100%;
	height: 50px;
`;
