import React from "react";
import {
	FetchMessagesByUser_FetchMessagesByUser_messages,
	GetUserById_GetUserById_user,
} from "../../types/api";
import Profile from "../Profile";
import * as S from "./MessageStyle";

interface IProps {
	receiver: GetUserById_GetUserById_user;
	message: FetchMessagesByUser_FetchMessagesByUser_messages;
}

const MessagePresenter: React.FC<IProps> = ({ message, receiver }) => {
	const isMine = receiver.id === message.receiver.id;

	return <S.Container isMine={isMine}>{message.content}</S.Container>;
};

export default MessagePresenter;
