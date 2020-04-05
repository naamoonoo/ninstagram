import React, { useEffect, useRef } from "react";
import ChatInput from "../../Components/ChatInput";
import Message from "../../Components/Message";
import Profile from "../../Components/Profile";
import {
	FetchMessagesByUser_FetchMessagesByUser_messages,
	GetUserById_GetUserById_user,
} from "../../types/api";
import * as S from "./ChatStyle";

interface IProps {
	receiver: GetUserById_GetUserById_user | null;
	messages:
		| (FetchMessagesByUser_FetchMessagesByUser_messages | null)[]
		| null;
	chatId: string | null;
}

const ChatPresenter: React.FC<IProps> = ({ receiver, messages, chatId }) => {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (ref && ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight;
			console.log("updated");
		}
	}, [messages]);

	const renderMessage = () => {
		if (!messages || !receiver) {
			return null;
		}
		return messages.map(
			(message, i) =>
				message && (
					<Message
						key={message.id}
						message={message}
						receiver={receiver}
					/>
				)
		);
	};

	return (
		<S.Container>
			{!receiver || !messages ? (
				"fetching the data..."
			) : (
				<>
					<S.Header>
						<Profile
							{...receiver}
							size={"30px"}
							fontSize={"16px"}
						/>
					</S.Header>
					<S.Content ref={ref}>{renderMessage()}</S.Content>
					<S.Input>
						<ChatInput receiver={receiver} chatId={chatId} />
					</S.Input>
				</>
			)}
		</S.Container>
	);
};

export default ChatPresenter;
