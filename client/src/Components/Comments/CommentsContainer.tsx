import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { toast } from "react-toastify";
import { GET_CURRENT_USER } from "../../SharedQueries";
import {
	CreateComment,
	CreateCommentVariables,
	DeleteComment,
	DeleteCommentVariables,
	GetComments,
	GetCommentsVariables,
	GetCurrentUser
} from "../../types/api";
import { useInput } from "../../utils/hooks";
import CommentsPresenter from "./CommentsPresenter";
import {
	CREATE_COMMENTS,
	DELETE_COMMENTS,
	GET_COMMENTS
} from "./CommentsQueries";

interface IProps {
	feedId: string;
}

const CommentsContainer: React.FC<IProps> = ({ feedId }) => {
	const [comment, onChangecomment, setComment] = useInput("");

	const { data: userData } = useQuery<GetCurrentUser>(GET_CURRENT_USER);
	const { data: commentsData, refetch } = useQuery<
		GetComments,
		GetCommentsVariables
	>(GET_COMMENTS, { variables: { feedId } });

	const [newCommentMutation] = useMutation<
		CreateComment,
		CreateCommentVariables
	>(CREATE_COMMENTS, {
		variables: {
			feedId,
			comment
		},
		onCompleted: ({ CreateComment: { res, error } }) => {
			if (res) {
				refetch();
			} else {
				toast.error(error);
			}
		}
	});

	const [deleteCommentMuataion] = useMutation<
		DeleteComment,
		DeleteCommentVariables
	>(DELETE_COMMENTS, {
		onCompleted: ({ DeleteComment: { res, error } }) => {
			if (res) {
				refetch();
			} else {
				toast.error(error);
			}
		}
	});

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		newCommentMutation();
		setComment("");
	};

	return (
		<CommentsPresenter
			comment={comment}
			onChangecomment={onChangecomment}
			userData={userData}
			onSubmit={onSubmit}
			commentsData={commentsData}
			deleteCommentMuataion={deleteCommentMuataion}
		/>
	);
};

export default CommentsContainer;
