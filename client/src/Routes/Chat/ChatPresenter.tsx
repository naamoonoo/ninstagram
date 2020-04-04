import React from "react";
import ChatInput from "../../Components/ChatInput";
import Message from "../../Components/Message";
import { FetchMessagesByUser_FetchMessagesByUser_messages } from "../../types/api";
import * as S from "./ChatStyle";

interface IProps {
	receiverId: string;
	messages:
		| (FetchMessagesByUser_FetchMessagesByUser_messages | null)[]
		| null;
}

const ChatPresenter: React.FC<IProps> = ({ receiverId, messages }) => {
	const chatId =
		messages && messages[0] && messages[0].chatId
			? messages[0].chatId
			: undefined;
	const renderMessage = () => {
		if (!messages) {
			return null;
		}
		return messages.map(
			(message) =>
				message && (
					<Message
						key={message.id}
						message={message}
						receiverId={receiverId}
					/>
				)
		);
	};

	return (
		<S.Container>
			{renderMessage()}
			<ChatInput receiverId={receiverId} chatId={chatId} />
		</S.Container>
	);
};

export default ChatPresenter;
