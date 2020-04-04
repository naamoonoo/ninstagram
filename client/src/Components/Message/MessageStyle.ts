import styled from "styled-components";

interface IProps {
	isMine: boolean;
}

export const Container = styled.div<IProps>`
	display: flex;
	/* flex-direction: column;
	align-items: flex-start; */

	right: 0;
	margin: 10 auto;
/* float: ${(props) => props.isMine && "left"}; */
`;

export const Message = styled.div<IProps>`
	/* position: absolute; */
	/* /* left: 0; */
	min-height: 50;
	justify-content: center;
	align-items: center;
	display: flex;
	overflow: auto;
	background: ${(props) => (props.isMine ? "lightblue" : "lightgray")};
	padding: 10;
	border-radius: 50;
	border: 1px red solid;
	align-self: ${(props) => props.isMine && "flex-end"};
	/* flex: 1; */
`;

export const Text = styled.p``;
