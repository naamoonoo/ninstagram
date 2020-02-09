import React from "react";
import { Routes } from "../../Routes/routes";
import { forceHistory } from "../../utils/history";
import * as S from "./ProfileStyle";

interface IProps {
	id: string;
	firstName: string;
	profilePhoto?: string;
	size?: string;
	fontSize?: string;
	clickable: boolean;
}

const ProfilePresenter: React.FC<IProps> = ({
	id,
	firstName,
	profilePhoto,
	size = "25px",
	fontSize = "0.9em",
	clickable = true
}) => {
	const onClickHandler = () => {
		if (!clickable) {
			return;
		}
		forceHistory.push(Routes.USER_PAGE + `/${id}`);
	};
	return (
		<S.Container onClick={onClickHandler}>
			<S.ProfileImg src={profilePhoto} size={size} />
			<S.Name fontSize={fontSize}>{firstName}</S.Name>
		</S.Container>
	);
};

export default ProfilePresenter;
