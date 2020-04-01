import { useQuery, useSubscription } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
	FetchMessagesByUser,
	FetchMessagesByUserVariables,
	FetchMessagesByUser_FetchMessagesByUser_messages,
	SubscribeCurrentChatMessage,
	SubscribeCurrentChatMessageVariables
} from "../../types/api";
import { Routes } from "../routes";
import ChatPresenter from "./ChatPresenter";
import { GET_MESSAGES, SUBSCRIBE_CURRENT_MESSAGES } from "./ChatQueries";

interface IProps extends RouteComponentProps<{}, {}, { receiverId: string }> {}

const ChatContainer: React.FC<IProps> = ({
	location: {
		state: { receiverId }
	},
	history
}) => {
	if (!receiverId) {
		history.push(Routes.FEED);
	}

	const [messages, setMessages] = useState<
		FetchMessagesByUser_FetchMessagesByUser_messages[]
	>([]);
	const {} = useQuery<FetchMessagesByUser, FetchMessagesByUserVariables>(
		GET_MESSAGES,
		{
			variables: { receiverId },
			onCompleted: ({
				FetchMessagesByUser: { messages: data, res, error }
			}) => {
				if (res && data) {
					console.log(data);
				} else {
					toast.error(error);
				}
			}
		}
	);

	useSubscription<
		SubscribeCurrentChatMessage,
		SubscribeCurrentChatMessageVariables
	>(SUBSCRIBE_CURRENT_MESSAGES, {
		variables: { otherId: receiverId },
		onSubscriptionComplete: () => {
			console.log("listening to subscritipn");
		},
		onSubscriptionData: ({
			subscriptionData: {
				data: { SubscribeCurrentChatMessage = {} } = {}
			} = {}
		}) => {
			// toast.error(
			// 	`${SubscribeCurrentChatMessage?.sender?.firstName} : ${SubscribeCurrentChatMessage?.content}`
			// );
			console.log(SubscribeCurrentChatMessage);
		}
	});

	return <ChatPresenter receiverId={receiverId} />;
};

export default ChatContainer;
