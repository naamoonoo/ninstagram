import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
	DeleteFeed,
	DeleteFeedVariables,
	GetFeed,
	GetFeedVariables,
	UpdateFeed,
	UpdateFeedVariables
} from "../../types/api";
import { useInput, useInputFocus } from "../../utils/hooks";
import { Routes } from "../routes";
import FeedDetailPresenter from "./FeedDetailPresenter";
import { DELETE_FEED, GET_FEED, UPDATE_FEED } from "./FeedDetailQueries";

interface IProps extends RouteComponentProps<{ feedId: string }> {}
const FeedDetailContainer: React.FC<IProps> = ({
	match: {
		params: { feedId }
	},
	history
}) => {
	if (!feedId) {
		history.push(Routes.HOME);
	}

	const ref = useInputFocus();
	const [input, onChangeInput, setInput] = useInput("");
	const { data: feedData } = useQuery<GetFeed, GetFeedVariables>(GET_FEED, {
		variables: { feedId },
		onCompleted: ({ GetFeed: { res, feed } }) => {
			if (res && feed && feed.text) {
				setInput(feed.text);
			}
		}
	});

	const [deleteMutation] = useMutation<DeleteFeed, DeleteFeedVariables>(
		DELETE_FEED,
		{
			variables: {
				feedId
			},
			onCompleted: ({ DeleteFeed: { res, error } }) => {
				if (res) {
					history.push(Routes.HOME);
				} else {
					toast.error(error);
				}
			}
		}
	);

	const [updateMutation] = useMutation<UpdateFeed, UpdateFeedVariables>(
		UPDATE_FEED,
		{
			variables: {
				feedId,
				text: input
			},
			onCompleted: ({ UpdateFeed: { res, error } }) => {
				if (res) {
					history.push(Routes.HOME);
				} else {
					toast.error(error);
				}
			}
		}
	);

	return (
		<FeedDetailPresenter
			feedData={feedData}
			ref={ref}
			input={input}
			onChangeInput={onChangeInput}
			updateMutation={updateMutation}
			deleteMutation={deleteMutation}
		/>
	);
};

export default FeedDetailContainer;
