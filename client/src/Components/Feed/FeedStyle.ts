import styled from "styled-components";

export const Container = styled.div`
	max-width: 750px;
	border: 1px solid lightgrey;
	display: block;
	justify-content: center;
	align-items: center;
	margin: auto;
	margin-bottom: 20px;
`;

export const Header = styled.div`
	width: 100%;
	height: 45px;
	display: flex;
	position: relative;
	align-items: center;
`;

export const Time = styled.span`
	color: grey;
	position: absolute;
	right: 15px;
	font-weight: lighter;
	font-size: 14px;
`;

export const Image = styled.img`
	width: 100%;
	height: auto;
	border-top: 1px solid lightgrey;
	border-bottom: 1px solid lightgrey;
	overflow: hidden;
`;

export const Infos = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	position: relative;
`;

interface LikeProps {
	isLiked: boolean;
}

export const Like = styled.div<LikeProps>`
	position: relative;
	left: 15px;
	fill: ${props => props.isLiked && "red"};
`;

interface MessageProps {
	commentShow: boolean;
}

export const Message = styled.div<MessageProps>`
	position: relative;
	left: 30px;
	fill: ${props => props.commentShow && "grey"};
	transform: scaleX(-1);
`;

export const EditMenu = styled.div`
	position: absolute;
	right: 15px;
	fill: lightgrey;
`;
