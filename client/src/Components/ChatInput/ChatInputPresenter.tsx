import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { ReactComponent as Chat } from "../../assets/icons/chat.svg";
import { CreateMessage, CreateMessageVariables } from "../../types/api";
import { useInput } from "../../utils/hooks";
import { SEND_MESSAGE } from "./ChatInputQueries";
import * as S from "./ChatInputStyle";

interface IProps {
	receiverId: string;
}

const ChatInputPresenter: React.FC<IProps> = ({ receiverId }) => {
	const [content, onContentChange, setContent] = useInput("");

	const [sendMessage] = useMutation<CreateMessage, CreateMessageVariables>(
		SEND_MESSAGE,
		{
			variables: { receiverId, content }
		}
	);

	const onSendMessage = (
		event:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		sendMessage();
		setContent("");
	};
	return (
		<S.Form onSubmit={onSendMessage}>
			<S.Input
				value={content}
				onChange={onContentChange}
				placeholder={"say hello to your friend!"}
			/>
			<S.Button onClick={onSendMessage}>
				<Chat />
			</S.Button>
		</S.Form>
	);
};

export default ChatInputPresenter;
