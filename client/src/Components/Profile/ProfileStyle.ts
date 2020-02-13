import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	margin: 2px;
`;

interface IImageProps {
	size?: string;
}

export const ProfileImg = styled.img<IImageProps>`
	border-radius: 50%;
	overflow: hidden;
	width: ${props => props.size || "25px"};
	height: ${props => props.size || "25px"};
	margin: 0 10px;
	border: 1px solid lightgrey;
	&:hover {
		border: 1px solid black;
	}
`;

interface INameeProps {
	fontSize?: string;
}
export const Name = styled.span<INameeProps>`
	font-size: ${props => props.fontSize || "0.9em"};
	cursor: pointer;
	color: darkgrey;
	&:hover {
		color: black;
	}
`;
