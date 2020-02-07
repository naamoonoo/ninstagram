import React from "react";
import { ReactComponent as CommentEmpty } from "../../assets/icons/comment-empty.svg";
import { ReactComponent as CommentFull } from "../../assets/icons/comment-full.svg";
import { ReactComponent as LikeEmpty } from "../../assets/icons/like-empty.svg";
import { ReactComponent as LikeFull } from "../../assets/icons/like-full.svg";
import { ReactComponent as EditMenu } from "../../assets/icons/menu-dot.svg";
import { getTimeDiff } from "../../utils/getTimeDiff";
import Profile from "../Profile";
import * as S from "./FeedStyle";

interface IProps {
	photo: string;
	text: string;
	user: any;
	updateAt: string;
}

const FeedPresenter: React.FC<IProps> = ({
	photo,
	text,
	user,
	updateAt,
	children
}) => {
	const liked = false;
	const numTime = parseInt(updateAt, 10);
	const time = isNaN(numTime) ? "now" : getTimeDiff(new Date(numTime));
	return (
		<S.Container>
			<S.Header>
				<Profile {...user} />
				<S.Time>{time}</S.Time>
			</S.Header>
			<S.Image src={photo} />
			<S.Infos>
				<S.Like isLiked={liked}>
					{liked ? <LikeFull /> : <LikeEmpty />}
				</S.Like>
				<S.Message commentShow={liked}>
					{liked ? <CommentFull /> : <CommentEmpty />}
				</S.Message>
				<S.EditMenu>
					<EditMenu />
				</S.EditMenu>
			</S.Infos>
			{children || <S.Text>{text}</S.Text>}
		</S.Container>
	);
};

export default FeedPresenter;
