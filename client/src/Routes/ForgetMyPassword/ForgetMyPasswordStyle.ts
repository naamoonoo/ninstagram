import styled from "styled-components";

export const Container = styled.div`
	display: contents;
	justify-content: center;
	align-items: center;
	width: 400px;
`;

export const Warning = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	color: red;
	font-weight: lighter;
	margin: 20px 0;
	opacity: 0.9;
`;

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
export const Header = styled.div<{ isSelected: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: ${props => props.isSelected && "bold"};
	color: ${props => (props.isSelected ? "black" : "darkgrey")};
	font-size: 1.3em;
	margin: 0 5px;
	cursor: pointer;
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
