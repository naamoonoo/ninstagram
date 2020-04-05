import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { ReactComponent as Chat } from "../../assets/icons/chat.svg";
import {
	CreateMessage,
	CreateMessageVariables,
	GetUserById_GetUserById_user,
} from "../../types/api";
import { useInput } from "../../utils/hooks";
import { SEND_MESSAGE } from "./ChatInputQueries";
import * as S from "./ChatInputStyle";

interface IProps {
	receiver: GetUserById_GetUserById_user;
	chatId: string | null;
}

const ChatInputPresenter: React.FC<IProps> = ({ receiver, chatId }) => {
	const [content, onContentChange, setContent] = useInput("");
	const emojis = ["😂", "😍", "💕", "😀", "😎", "🎉", "😊", "👍"];
	const [sendMessage] = useMutation<CreateMessage, CreateMessageVariables>(
		SEND_MESSAGE,
		{
			variables: { receiverId: receiver.id, content, chatId },
		}
	);

	const onSendMessage = (
		event:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		if (!content) {
			return;
		}
		sendMessage();
		setContent("");
	};

	const renderEmoji = () => {
		return emojis.map((emoji) => (
			<S.Emoji
				key={emoji}
				onClick={() =>
					sendMessage({
						variables: {
							receiverId: receiver.id,
							content: emoji,
							chatId,
						},
					})
				}
			>
				{emoji}
			</S.Emoji>
		));
	};

	return (
		<S.Form onSubmit={onSendMessage}>
			<S.Input
				value={content}
				onChange={onContentChange}
				placeholder={`say hello to ${receiver.firstName}!`}
				autoFocus={true}
			/>
			{content ? (
				<S.Button onClick={onSendMessage}>
					<Chat />
				</S.Button>
			) : (
				<S.Emojis>{renderEmoji()}</S.Emojis>
			)}
		</S.Form>
	);
};

export default ChatInputPresenter;
