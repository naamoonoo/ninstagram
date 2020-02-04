import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
`;

export const ProfileImg = styled.img`
	border-radius: 50%;
	overflow: hidden;
	width: 25px;
	height: 25px;
	margin: 0 10px;
	border: 1px solid lightgrey;
	&:hover {
		border: 1px solid black;
	}
`;

export const Name = styled.span`
	cursor: pointer;
	color: darkgrey;
	&:hover {
		color: black;
	}
`;
