import styled from "styled-components";

interface IProps {
	isMine: boolean;
}

export const Container = styled.div<IProps>`
	/* overflow: auto; */
	/* background: ${(props) => (props.isMine ? "lightblue" : "lightgray")}; */
	/* position:flex; */
	/* width: 100%; */

	/* /* left: 0; */
	/* justify-content: center; */

	/* border-radius: 50;
	min-height: 50;
	align-items: center;
	display: flex; */
	/* padding: 10;
	border: 1px red solid; */
	/* align-self: ${(props) => props.isMine && "flex-end"}; */
/* background: ${(props) => (props.isMine ? "lightblue" : "lightgray")}; */
	background-color: ${(props) => (props.isMine ? "lightblue" : "lightgray")};
	color: white;
	padding: 10px 20px;
	border-radius: 20px;
	align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
	border-bottom-right-radius: ${(props) => (props.isMine ? "0px" : "20px")};
	border-bottom-left-radius: ${(props) => (!props.isMine ? "0px" : "20px")};
	margin-bottom: 10px;
	word-break:break-all;
`;

export const Text = styled.div<IProps>`
	${(props) =>
		props.isMine
			? {
					background: "lightblue",
					textAlign: "right",
			  }
			: {
					background: "lightgray",
			  }};
`;
