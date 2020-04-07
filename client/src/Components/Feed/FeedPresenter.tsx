import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { ReactComponent as Chat } from "../../assets/icons/chat.svg";
import { ReactComponent as CommentEmpty } from "../../assets/icons/comment-empty.svg";
import { ReactComponent as CommentFull } from "../../assets/icons/comment-full.svg";
import { ReactComponent as LikeEmpty } from "../../assets/icons/like-empty.svg";
import { ReactComponent as LikeFull } from "../../assets/icons/like-full.svg";
import { ReactComponent as EditMenu } from "../../assets/icons/menu-dot.svg";
import { Routes } from "../../Routes/routes";
import { getTimeDiff } from "../../utils/getTimeDiff";
import { forceHistory, history } from "../../utils/history";
import Comments from "../Comments";
import Profile from "../Profile";
import * as S from "./FeedStyle";

interface IProps {
	id?: string;
	photo: string;
	text: string;
	user: any;
	updateAt: string;
	liked?: boolean;
	onLike?: any;
	onDisLike?: any;
	isCurrentUser?: boolean;
	unfoldComment?: boolean;
	isUpdate?: boolean;
	likes?: any[];
}

const FeedPresenter: React.FC<IProps> = ({
	id,
	photo,
	text,
	user,
	updateAt,
	children,
	liked,
	onLike,
	onDisLike,
	isCurrentUser,
	unfoldComment = false,
	isUpdate = false,
	likes
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [commentShow, setCommentShow] = useState(unfoldComment);
	const numTime = parseInt(updateAt, 10);
	const time = isNaN(numTime) ? "now" : getTimeDiff(new Date(numTime));
	const likeHandler = () => {
		if (!onDisLike || !onLike) {
			return;
		}
		if (liked) {
			return onDisLike({ variables: { feedId: id } });
		}
		return onLike({ variables: { feedId: id } });
	};

	const renderText = (text: string) => {
		return text.split(" ").map(word => {
			if (word.startsWith("#")) {
				const tag = word.substr(1);
				return (
					<S.Tag key={tag} to={`/search/${tag}`}>
						{word}&nbsp;
					</S.Tag>
				);
			} else {
				return `${word} `;
			}
		});
	};

	return (
		<S.Container
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<S.Header>
				<Profile {...user} />
				<S.Time>{time}</S.Time>
			</S.Header>

			<S.Image
				src={
					photo ||
					"https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
				}
				onDoubleClick={likeHandler}
			/>
			{!isUpdate && (
				<S.Infos>
					<S.Like isLiked={liked || false} onClick={likeHandler}>
						{liked ? <LikeFull /> : <LikeEmpty />}
					</S.Like>
					<S.Message
						commentShow={commentShow}
						onClick={() => setCommentShow(!commentShow)}
					>
						{commentShow ? <CommentFull /> : <CommentEmpty />}
					</S.Message>
					{!isCurrentUser && (
						<Chat
							onClick={() =>
								forceHistory.push(Routes.CHAT, {
									receiverId: user.id
								})
							}
						/>
					)}
					{likes && <S.Info>{likes.length} likes</S.Info>}
					{((isHovered && isCurrentUser) ||
						(isMobile && isCurrentUser)) && (
						<S.EditMenu
							onClick={() =>
								forceHistory.push(Routes.FEED + `/${id}`)
							}
						>
							<EditMenu />
						</S.EditMenu>
					)}
				</S.Infos>
			)}
			{children || <S.Text>{text && renderText(text)}</S.Text>}
			{commentShow && id && (
				<S.Comments>
					<Comments feedId={id} />
				</S.Comments>
			)}
		</S.Container>
	);
};

export default FeedPresenter;
