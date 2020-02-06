import React from "react";
import Profile from "../../Components/Profile";
import { Routes } from "../routes";
import * as S from "./UserPageStyle";

interface IProps {
	userData: any;
	history: any;
}

const UserPagePresenter: React.FC<IProps> = ({
	userData: { GetUserById: { user = {} } = {} } = {},
	history
}) => {
	const renderPhotos = (feeds: any[]) => {
		return feeds.map(feed => {
			return (
				<S.Image
					src={feed.photo}
					key={feed.id}
					onClick={() => history.push(Routes.FEED + `/${feed.id}`)}
				/>
			);
		});
	};
	return (
		<S.Container>
			<S.ProfileContainer>
				<Profile {...user} size={"75px"} fontSize={"1.2em"} />
			</S.ProfileContainer>
			<S.PhotoContainer>
				{user.feeds && renderPhotos(user.feeds)}
			</S.PhotoContainer>
		</S.Container>
	);
};

export default UserPagePresenter;
