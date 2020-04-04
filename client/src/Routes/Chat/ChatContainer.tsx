import { useQuery, useSubscription } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
	FetchMessagesByUser,
	FetchMessagesByUserVariables,
	FetchMessagesByUser_FetchMessagesByUser_messages,
	SubscribeCurrentChatMessage,
	SubscribeCurrentChatMessageVariables,
} from "../../types/api";
import { Routes } from "../routes";
import ChatPresenter from "./ChatPresenter";
import { GET_MESSAGES, SUBSCRIBE_CURRENT_MESSAGES } from "./ChatQueries";

interface IProps extends RouteComponentProps<{}, {}, { receiverId: string }> {}

const ChatContainer: React.FC<IProps> = ({
	location: {
		state: { receiverId },
	},
	history,
}) => {
	if (!receiverId) {
		history.push(Routes.FEED);
	}

	const {
		data: { FetchMessagesByUser: { messages = [] } = {} } = {},
		refetch,
	} = useQuery<FetchMessagesByUser, FetchMessagesByUserVariables>(
		GET_MESSAGES,
		{
			variables: { receiverId },
			onCompleted: ({ FetchMessagesByUser: { error } }) => {
				if (error) toast.error(error);
			},
		}
	);

	useSubscription<
		SubscribeCurrentChatMessage,
		SubscribeCurrentChatMessageVariables
	>(SUBSCRIBE_CURRENT_MESSAGES, {
		variables: { otherId: receiverId },
		onSubscriptionData: () => {
			refetch();
		},
	});

	const chatId =
		messages && messages[0] && messages[0].chatId
			? messages[0].chatId
			: undefined;
	return <ChatPresenter receiverId={receiverId} messages={messages} />;
};

export default ChatContainer;
