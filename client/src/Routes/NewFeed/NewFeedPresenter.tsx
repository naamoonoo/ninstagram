import React from "react";
import CameraButton from "../../Components/CameraButton";
import Feed from "../../Components/Feed";
import { useTitle } from "../../utils/hooks";
import * as S from "./NewFeedStyle";

interface IProps {
	photo: string;
	text: string;
	onChageText: any;
	userData: any;
	onClickHandler: () => void;
	clickable: boolean;
}

const NewFeedPresenter: React.FC<IProps> = ({
	photo,
	text,
	onChageText,
	userData: { GetCurrentUser: { user = {} } = {} } = {},
	onClickHandler,
	clickable
}) => {
	useTitle("ninstgram | New Feed");
	return (
		<S.Container>
			<Feed photo={photo} text={text} user={user} updateAt={"now"}>
				<S.TextInput
					type="text"
					value={text}
					onChange={onChageText}
					placeholder={"leave a comment..."}
				/>
			</Feed>
			{clickable && (
				<CameraButton
					hovered={text.length > 0}
					onClick={onClickHandler}
				/>
			)}
		</S.Container>
	);
};

export default NewFeedPresenter;
