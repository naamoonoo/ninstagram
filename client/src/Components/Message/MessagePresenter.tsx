import React from "react";
import {
	FetchMessagesByUser_FetchMessagesByUser_messages,
	SubscribeCurrentChatMessage_SubscribeCurrentChatMessage,
} from "../../types/api";
import Profile from "../Profile";
import * as S from "./MessageStyle";

interface IProps {
	receiverId: string;
	message: FetchMessagesByUser_FetchMessagesByUser_messages;
}

const MessagePresenter: React.FC<IProps> = ({ message, receiverId }) => {
	const isMine = receiverId === message.receiver.id;

	return (
		<S.Container isMine={isMine}>
			{!isMine && <Profile {...message.sender} onlyPhoto={true} />}
			<S.Message isMine={isMine}>
				<S.Text>{message.content}</S.Text>
			</S.Message>
			{isMine && <Profile {...message.sender} onlyPhoto={true} />}
		</S.Container>
	);
};

export default MessagePresenter;
