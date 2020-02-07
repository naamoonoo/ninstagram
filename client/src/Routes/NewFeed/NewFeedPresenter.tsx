import React from "react";
import CameraButton from "../../Components/CameraButton";
import Feed from "../../Components/Feed";
import * as S from "./NewFeedStyle";

interface IProps {
	photo: string;
	text: string;
	onChageText: any;
	userData: any;
	onClickHandler: () => void;
}

const NewFeedPresenter: React.FC<IProps> = ({
	photo,
	text,
	onChageText,
	userData: { GetCurrentUser: { user = {} } = {} } = {},
	onClickHandler
}) => {
	console.log(user);
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
			<CameraButton hovered={text.length > 0} onClick={onClickHandler} />
		</S.Container>
	);
};

export default NewFeedPresenter;
