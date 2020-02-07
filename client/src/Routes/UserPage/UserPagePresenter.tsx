import React from "react";
import Profile from "../../Components/Profile";
import { forceHistory } from "../../utils/history";
import { Routes } from "../routes";
import * as S from "./UserPageStyle";

interface IProps {
	userData: any;
	history: any;
	isCurrentUser: boolean;
	logOutMutation: any;
}

const UserPagePresenter: React.FC<IProps> = ({
	userData: { GetUserById: { user = {} } = {} } = {},
	history,
	isCurrentUser,
	logOutMutation
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
				<Profile
					{...user}
					size={"75px"}
					fontSize={"1.2em"}
					clickable={false}
				/>
			</S.ProfileContainer>
			<S.PhotoContainer>
				{user.feeds && renderPhotos(user.feeds)}
			</S.PhotoContainer>
			{isCurrentUser && (
				<S.Button
					onClick={() => {
						logOutMutation();
						forceHistory.push(Routes.HOME);
					}}
				>
					Logout
				</S.Button>
			)}
		</S.Container>
	);
};

export default UserPagePresenter;
