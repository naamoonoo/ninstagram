import { Link } from "react-router-dom";
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
	border-bottom: 1px solid lightgrey;
`;

export const Info = styled.span`
	color: grey;
	position: relative;
	left: 15px;
	font-weight: lighter;
	font-size: 14px;
`;

interface LikeProps {
	isLiked: boolean;
}

export const Like = styled.div<LikeProps>`
	position: relative;
	left: 15px;
	fill: ${props => props.isLiked && "red"};
	cursor: pointer;
`;

interface MessageProps {
	commentShow: boolean;
}

export const Message = styled.div<MessageProps>`
	position: relative;
	left: 30px;
	margin-right: 45px;
	fill: ${props => props.commentShow && "grey"};
	transform: scaleX(-1);
	cursor: pointer;
`;

export const EditMenu = styled.div`
	position: absolute;
	right: 15px;
	fill: lightgrey;
`;

export const Text = styled.span`
	padding: 10px 20px;
	/* font-size: 0.9em; */
	min-height: 80px;
	display: flex;
	align-items: center;
	font-weight: lighter;
`;

export const Comments = styled.div`
	border-top: 1px solid lightgrey;
	width: 100%;
	padding: 5px 10px;
`;

export const Tag = styled(Link)`
	color: ${props => props.theme.tagColor};
	font-weight: 300;
	text-decoration: underline;
	margin: 0 1px;
	padding: 0 1px;
`;
