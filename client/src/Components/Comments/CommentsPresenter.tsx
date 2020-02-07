import React from "react";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import Profile from "../Profile";
import * as S from "./CommentsStyle";

interface IProps {
	comment: string;
	userData: any;
	onChangecomment: (event: React.ChangeEvent<Element>) => any;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	commentsData: any;
	deleteCommentMuataion: any;
}

const CommentsPresenter: React.FC<IProps> = ({
	comment,
	onChangecomment,
	userData: { GetCurrentUser: { user = null } = {} } = {},
	onSubmit,
	commentsData: { GetComments: { comments = null } = {} } = {},
	deleteCommentMuataion
}) => {
	const renderComments = (comments: any[]) => {
		return comments.map(({ id, comment, user: commentUser }, idx) => (
			<S.CommentContainer key={id}>
				<Profile {...commentUser} />
				<S.Text>{comment}</S.Text>
				{user && user.id === commentUser.id && (
					<S.DeleteButton
						onClick={() =>
							deleteCommentMuataion({
								variables: {
									commentId: id
								}
							})
						}
					>
						<Delete />
					</S.DeleteButton>
				)}
			</S.CommentContainer>
		));
	};

	return (
		<S.Container>
			{comments && renderComments(comments)}
			{user && (
				<S.CommentContainer>
					<Profile {...user} />
					<S.Form onSubmit={onSubmit}>
						<S.Input
							type="text"
							placeholder="leave a comment"
							value={comment}
							onChange={onChangecomment}
						/>
					</S.Form>
				</S.CommentContainer>
			)}
		</S.Container>
	);
};

export default CommentsPresenter;
