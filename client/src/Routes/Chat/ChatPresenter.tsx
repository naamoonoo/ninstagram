import React from "react";
import ChatInput from "../../Components/ChatInput";
import Message from "../../Components/Message";
import * as S from "./ChatStyle";

interface IProps {
	receiverId: string;
}

const ChatPresenter: React.FC<IProps> = ({ receiverId }) => {
	return (
		<S.Container>
			chat presneter
			<Message />
			<ChatInput receiverId={receiverId} />
		</S.Container>
	);
};

export default ChatPresenter;
