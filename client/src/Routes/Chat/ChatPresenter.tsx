import React from "react";
import Message from "../../Components/Message";
import * as S from "./ChatStyle";

interface IProps {}

const ChatPresenter: React.FC<IProps> = () => {
	return (
		<S.Container>
			chat presneter
			<Message />
		</S.Container>
	);
};

export default ChatPresenter;
