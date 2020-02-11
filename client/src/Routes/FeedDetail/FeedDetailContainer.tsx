import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_CURRENT_USER } from "../../SharedQueries";
import {
	DeleteFeed,
	DeleteFeedVariables,
	GetFeed,
	GetFeedVariables,
	UpdateFeed,
	UpdateFeedVariables,
	UpdateProfilePhoto,
	UpdateProfilePhotoVariables
} from "../../types/api";
import { useInput } from "../../utils/hooks";
import { Routes } from "../routes";
import FeedDetailPresenter from "./FeedDetailPresenter";
import {
	DELETE_FEED,
	GET_FEED,
	UPDATE_FEED,
	UPDATE_PROFILE_PHOTO
} from "./FeedDetailQueries";

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

	const [input, onChangeInput, setInput] = useInput("");
	const { data: userData, refetch: userRefetch } = useQuery(GET_CURRENT_USER);
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

	const [updateProfilePhoto] = useMutation<
		UpdateProfilePhoto,
		UpdateProfilePhotoVariables
	>(UPDATE_PROFILE_PHOTO, {
		onCompleted: ({ UpdateUser: { res, error } }) => {
			if (res) {
				userRefetch();
			} else {
				toast.error(error);
			}
		}
	});

	return (
		<FeedDetailPresenter
			userData={userData}
			feedData={feedData}
			input={input}
			onChangeInput={onChangeInput}
			updateMutation={updateMutation}
			deleteMutation={deleteMutation}
			updateProfilePhoto={updateProfilePhoto}
		/>
	);
};

export default FeedDetailContainer;
