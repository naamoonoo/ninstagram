import styled from "styled-components";

interface IProps {
	hovered?: boolean;
}
export const Container = styled.button<IProps>`
	position: fixed;
	bottom: 15px;
	left: 0;
	right: 0;
	margin: auto;
	height: 50px;
	width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background: radial-gradient(
		circle at 30% 107%,
		#fdf497 0%,
		#fdf497 5%,
		#fd5949 45%,
		#d6249f 60%,
		#285aeb 90%
	);
	fill: black;
	opacity: ${(props) => (props.hovered ? 1 : 0.25)};

	/* shadow */
	-moz-box-shadow: 3px 3px 3px 1px #ccc;
	-webkit-box-shadow: 3px 3px 3px 1px #ccc;
	box-shadow: 3px 3px 3px 1px #ccc;

	/* transition change the background */
	-webkit-transition: all 0.5s ease-out;
	-ms-transition: all 0.5s ease-out;
	transition: all 0.5s ease-out;
	&:hover {
		cursor: pointer;
		fill: white;
		opacity: 1;
	}
`;
