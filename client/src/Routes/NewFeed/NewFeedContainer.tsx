import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
	CreateFeed,
	CreateFeedVariables,
	GetCurrentUserNewFeed
} from "../../types/api";
import { base64Uploader } from "../../utils/fileUploader";
import { useInput } from "../../utils/hooks";
import { Routes } from "../routes";
import NewFeedPresenter from "./NewFeedPresenter";
import { CREATE_FEED, GET_CURRENT_USER_NEW_FEED } from "./NewFeedQueries";

interface IProps extends RouteComponentProps<{}, {}, { photo: string }> {}

const NewFeedContainer: React.FC<IProps> = ({
	location: {
		state: { photo: inputPhoto }
	},
	history
}) => {
	if (!inputPhoto) {
		history.push(Routes.HOME);
	}
	const [clickable, setClickable] = useState(true);
	const [text, onChangeText] = useInput("");
	const { data: userData } = useQuery<GetCurrentUserNewFeed>(
		GET_CURRENT_USER_NEW_FEED
	);

	const [newFeedMutation] = useMutation<CreateFeed, CreateFeedVariables>(
		CREATE_FEED,
		{
			onCompleted: ({ CreateFeed: { res, error } }) => {
				if (res) {
					history.push(Routes.HOME);
				} else {
					toast.error(error);
				}
			}
		}
	);

	const onClickHandler = async () => {
		if (text.length <= 0) {
			return toast.error("Should leave a message...");
		}
		setClickable(false);
		toast.done("Creating a new Feed...");
		const photo = await base64Uploader(inputPhoto);
		newFeedMutation({
			variables: {
				text,
				photo
			}
		});
	};
	return (
		<NewFeedPresenter
			photo={inputPhoto}
			text={text}
			onChageText={onChangeText}
			userData={userData}
			onClickHandler={onClickHandler}
			clickable={clickable}
		/>
	);
};

export default NewFeedContainer;
