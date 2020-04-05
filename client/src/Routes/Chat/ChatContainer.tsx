import { useQuery, useSubscription } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
	FetchMessagesByUser,
	FetchMessagesByUserVariables,
	GetUserById,
	GetUserByIdVariables,
	SubscribeCurrentChatMessage,
	SubscribeCurrentChatMessageVariables,
} from "../../types/api";
import { Routes } from "../routes";
import { GET_USER_BY_ID } from "../UserPage/UserPageQueries";
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

	const [chatId, setChatId] = useState<string | null>(null);

	const {
		data: { GetUserById: { user: receiver = null } = {} } = {},
	} = useQuery<GetUserById, GetUserByIdVariables>(GET_USER_BY_ID, {
		variables: { userId: receiverId },
	});

	const {
		data: { FetchMessagesByUser: { messages = [] } = {} } = {},
		refetch,
	} = useQuery<FetchMessagesByUser, FetchMessagesByUserVariables>(
		GET_MESSAGES,
		{
			variables: { receiverId },
			onCompleted: ({ FetchMessagesByUser: { error, messages } }) => {
				if (messages && messages[0]) {
					setChatId(messages[0].chatId);
				}
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

	return (
		<ChatPresenter
			receiver={receiver}
			messages={messages}
			chatId={chatId}
		/>
	);
};

export default ChatContainer;
