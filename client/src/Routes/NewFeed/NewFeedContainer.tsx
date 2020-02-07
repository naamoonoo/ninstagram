import { useQuery, useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
	GetCurrentUserNewFeed,
	CreateFeed,
	CreateFeedVariables
} from "../../types/api";
import { useInput } from "../../utils/hooks";
import { Routes } from "../routes";
import NewFeedPresenter from "./NewFeedPresenter";
import { GET_CURRENT_USER_NEW_FEED, CREATE_FEED } from "./NewFeedQueries";
import { toast } from "react-toastify";

interface IProps extends RouteComponentProps<{}, {}, { photo: string }> {}

const NewFeedContainer: React.FC<IProps> = ({
	location: {
		state: { photo }
	},
	history
}) => {
	if (!photo) {
		history.push(Routes.HOME);
	}

	const [text, onChangeText] = useInput("");
	const { data: userData } = useQuery<GetCurrentUserNewFeed>(
		GET_CURRENT_USER_NEW_FEED
	);

	const [newFeedMutation] = useMutation<CreateFeed, CreateFeedVariables>(
		CREATE_FEED,
		{
			variables: {
				text,
				photo
			},
			onCompleted: ({ CreateFeed: { res, error } }) => {
				if (res) {
					history.push(Routes.HOME);
				} else {
					toast.error(error);
				}
			}
		}
	);

	const onClickHandler = () => {
		if (text.length <= 0) {
			return toast.error("Should leave a message...");
		}
		newFeedMutation();
	};
	return (
		<NewFeedPresenter
			photo={photo}
			text={text}
			onChageText={onChangeText}
			userData={userData}
			onClickHandler={onClickHandler}
		/>
	);
};

export default NewFeedContainer;
