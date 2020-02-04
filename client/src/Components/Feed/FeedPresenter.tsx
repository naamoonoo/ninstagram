import React from "react";
import { ReactComponent as CommentEmpty } from "../../assets/icons/comment-empty.svg";
import { ReactComponent as CommentFull } from "../../assets/icons/comment-full.svg";
import { ReactComponent as LikeEmpty } from "../../assets/icons/like-empty.svg";
import { ReactComponent as LikeFull } from "../../assets/icons/like-full.svg";
import { ReactComponent as EditMenu } from "../../assets/icons/menu-dot.svg";
import Profile from "../Profile";
import * as S from "./FeedStyle";

interface IProps {
	photo: string;
	text: string;
	user: any;
}

const FeedPresenter: React.FC<IProps> = ({ photo, text, user }) => {
	const liked = false;
	return (
		<S.Container>
			<S.Header>
				<Profile {...user} />
				<S.Time>2h</S.Time>
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
			{text}
		</S.Container>
	);
};

export default FeedPresenter;
