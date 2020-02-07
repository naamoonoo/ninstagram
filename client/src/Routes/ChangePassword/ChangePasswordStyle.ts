import styled from "styled-components";

export const Container = styled.div`
	display: contents;
	justify-content: center;
	align-items: center;
	width: 400px;
`;

export const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	color: darkgrey;
	font-size: 1.3em;
`;

export const Form = styled.form`
	margin: 20px 0;
	width: 100%;
	display: grid;
	justify-content: center;
	align-items: center;
`;

interface IButton {
	color: string;
}

export const Button = styled.button<IButton>`
	display: block;
	height: 30px;
	width: 200px;
	color: white;
	background-color: ${props => props.color};
	margin: 10px auto 0 auto;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 3px;
`;
